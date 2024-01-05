import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { CarritoResponse } from 'src/app/core/controllers/services/business/dto/carrito/carrito.dto';
import { TipoComprobanteEnum } from 'src/app/core/enums/tipo-comprobante.enum';
import { TipoDocumentoEnum } from 'src/app/core/enums/tipo-documento.enum';
import { CheckoutFW, CheckoutPasoActual } from '../../../checkout.form';
import { FormUtil } from 'src/app/core/utils/form.util';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constant';

interface IData {
  carrito?: CarritoResponse;
  tiposDeDocumento?: {
    id: number;
    nombre: string;
  }[];
}

@Component({
  selector: 'step-facturacion',
  templateUrl: './step-facturacion.component.html',
  styleUrls: ['./step-facturacion.component.scss'],
})
export class StepFacturacionComponent implements OnInit, OnDestroy {

  @Input()
  public fw!: CheckoutFW;

  @Input()
  public data!: IData;

  public TipoComprobanteType = TipoComprobanteEnum;
  public TipoDocumentoType = TipoDocumentoEnum;

  public tiposDeDocumento!: {
    id: number;
    nombre: string;
  }[];

  public tipoComprobanteSub!: Subscription;

  constructor(
    private readonly businessService: BusinessService,
  ) { }

  ngOnInit(): void {
    this.tiposDeDocumento = this.data.tiposDeDocumento!.filter(
      (e) => e.id !== TipoDocumentoEnum.RUC
    );

    this.tipoComprobanteSub =
      this.fw.formulario.controls.informacionDeFacturacion.controls.tipoDeComprobante.valueChanges.subscribe(
        (value) => {
          if (value === TipoComprobanteEnum.Boleta) {
            this.fw.formulario.controls.informacionDeFacturacion.controls.tipoDeDocumentoDeIdentidad.setValue(
              TipoDocumentoEnum.DNI
            );
            this.tiposDeDocumento = [
              ...this.data.tiposDeDocumento!.filter(
                (e) => e.id !== TipoDocumentoEnum.RUC
              ),
            ];
            return;
          }

          this.fw.formulario.controls.informacionDeFacturacion.controls.tipoDeDocumentoDeIdentidad.setValue(
            TipoDocumentoEnum.RUC
          );
          this.tiposDeDocumento = [
            ...this.data.tiposDeDocumento!.filter(
              (e) => e.id === TipoDocumentoEnum.RUC
            ),
          ];
        }
      );
  }

  onSubmit() {
    this.fw.submitted = true;
    if (FormUtil.isInvalidForm(this.fw.formulario.controls.informacionDeFacturacion) ||
      !this.fw.extraValidation()) {
      return;
    }

    this.fw.pasoActual = CheckoutPasoActual.TransferenciaBancaria;
  }

  async buscarPersona(): Promise<void> {
    if (
      this.fw.formulario.value.informacionDeFacturacion!
        .tipoDeDocumentoDeIdentidad !== TipoDocumentoEnum.RUC
    ) {
      const personaEncontrada = await this.businessService.methodGet<
        any,
        any
      >(ENDPOINTS.personas.busqueda, {
        tipoBusqueda:
          this.fw.formulario.value.informacionDeFacturacion!
            .tipoDeDocumentoDeIdentidad,
        valorBusqueda:
          this.fw.formulario.value.informacionDeFacturacion!
            .numeroDeDocumento,
      });
      if (!personaEncontrada) {
        alert('No se encontró a la persona');
        return;
      }

      this.fw.formulario.patchValue({
        informacionDeFacturacion: {
          nombres: personaEncontrada.nombres,
          apellidos:
            personaEncontrada.apellidoPaterno +
            ' ' +
            personaEncontrada.apellidoMaterno,
        },
      });
      return;
    }

    try {
      const persona = await this.businessService.methodGet<
        any,
        any
      >(ENDPOINTS.personas.sunat, {
        ruc: this.fw.formulario.value.informacionDeFacturacion!
          .numeroDeDocumento,
      });

      this.fw.formulario.patchValue({
        informacionDeFacturacion: {
          razonSocial: persona.razonSocial,
          direccion: persona.direccion,
        },
      });
    } catch (error) {
      alert('No se encontró persona RUC');
    }
  }

  ngOnDestroy(): void {
    this.tipoComprobanteSub?.unsubscribe();
  }
}
