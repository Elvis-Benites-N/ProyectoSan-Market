import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormWrapper } from "src/app/core/classes/form-wrapper.class";
import { CrearPagoRequest } from "src/app/core/controllers/services/business/dto/pagos/crear-pago.dto";
import { TipoDocumentoEnum } from "src/app/core/enums/tipo-documento.enum";

export enum CheckoutPasoActual {
    Facturacion,
    TransferenciaBancaria,
    Confirmacion,
  }

export interface CheckoutForm {
    informacionDeFacturacion: FormGroup<{
        tipoDeComprobante: FormControl<number | null>;
        tipoDeDocumentoDeIdentidad: FormControl<number | null>;
        numeroDeDocumento: FormControl<string | null>;
        nombres: FormControl<string | null>;
        apellidos: FormControl<string | null>;
        razonSocial: FormControl<string | null>;
        direccion: FormControl<string | null>;
        email: FormControl<string | null>;
        guardaInformacion: FormControl<boolean | null>;
    }>;
    metodoDePago: FormGroup<{
        metodoId: FormControl<number | null>,
    }>;
}

export class CheckoutFW extends FormWrapper<
    CrearPagoRequest,
    CheckoutForm
>{
    pasoActual: CheckoutPasoActual;

    constructor() {
        super();
        this.pasoActual = CheckoutPasoActual.Facturacion;
    }

    public override async toRequest(): Promise<CrearPagoRequest> {
        const value = this.formulario.getRawValue();

        return {
            codigoPago: '70346115',
            comprobantePago: {
                idTipoComprobante: value.informacionDeFacturacion.tipoDeComprobante!,
                idTipoDocumento:
                    value.informacionDeFacturacion.tipoDeDocumentoDeIdentidad!,
                numeroDocumento: value.informacionDeFacturacion.numeroDeDocumento!,
                email: value.informacionDeFacturacion.email!,
                apellidos: value.informacionDeFacturacion.apellidos!,
                direccion: value.informacionDeFacturacion.direccion!,
                nombres: value.informacionDeFacturacion.nombres!,
                razonSocial: value.informacionDeFacturacion.razonSocial!,
            },
            informacionPago: {
                idBancoUniversidad: value.metodoDePago.metodoId!,
            },
        };
    }

    protected override inicializarFormulario(): void {
        this.formulario = new FormGroup({
            informacionDeFacturacion: new FormGroup({
                tipoDeComprobante: new FormControl<number | null>(null, [Validators.required]),
                tipoDeDocumentoDeIdentidad: new FormControl<number | null>(null, [
                    Validators.required,
                ]),
                numeroDeDocumento: new FormControl<string>('', [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(15),
                ]),
                nombres: new FormControl<string | null>(
                    {
                        value: null,
                        disabled: true,
                    },
                    [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
                ),
                apellidos: new FormControl<string | null>(
                    {
                        value: null,
                        disabled: true,
                    },
                    [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
                ),
                razonSocial: new FormControl<string | null>({
                    value: null,
                    disabled: true,
                }),
                direccion: new FormControl<string | null>({
                    value: null,
                    disabled: true,
                }),
                email: new FormControl<string>('', [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50),
                    Validators.email,
                ]),
                guardaInformacion: new FormControl<boolean>(false),
            }),
            metodoDePago: new FormGroup({
                metodoId: new FormControl<number | null>(null, [Validators.required]),
            }),
        });
    }

    public override extraValidation(): boolean {
        const f = this.formulario.getRawValue();

        if (f.informacionDeFacturacion.tipoDeDocumentoDeIdentidad
            === TipoDocumentoEnum.RUC) {
            return f.informacionDeFacturacion.razonSocial !== null &&
                f.informacionDeFacturacion.razonSocial !== undefined &&
                f.informacionDeFacturacion.direccion !== null &&
                f.informacionDeFacturacion.direccion !== undefined;
        }

        return f.informacionDeFacturacion.nombres !== null &&
            f.informacionDeFacturacion.nombres !== undefined &&
            f.informacionDeFacturacion.apellidos !== null &&
            f.informacionDeFacturacion.apellidos !== undefined;
    }

    protected override deshabilitarCampos(): void {
        this.formulario.controls.informacionDeFacturacion.controls.nombres.disable();
        this.formulario.controls.informacionDeFacturacion.controls.apellidos.disable();
        this.formulario.controls.informacionDeFacturacion.controls.razonSocial.disable();
        this.formulario.controls.informacionDeFacturacion.controls.direccion.disable();
    }

}