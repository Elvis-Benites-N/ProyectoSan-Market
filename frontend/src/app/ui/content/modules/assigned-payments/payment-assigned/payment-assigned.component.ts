import { Component, Input } from '@angular/core';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constant';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { CuotaInterface, DeudaInterface } from 'src/app/core/controllers/services/business/dto/deudas/deuda.dto';
import { DeudaView } from 'src/app/core/controllers/services/business/dto/deudas/listado-deuda.dto';
import { EstadoCuotaEnum } from 'src/app/core/enums/estado-cuota.enum';
import { EstadoDeudaEnum } from 'src/app/core/enums/estado-deuda.enum';

interface DeudaExtra {
  montoPagado: number;
  montoPendiente: number;
  porcentaje: number;
  cuotaProximaAVencer?: CuotaInterface;
}

@Component({
  selector: 'payment-assigned[deuda]',
  templateUrl: './payment-assigned.component.html',
  styleUrls: ['./payment-assigned.component.scss']
})
export class PaymentAssignedComponent {

  @Input()
  deuda!: DeudaView;

  mostrarDetalleAsignacion = false;

  detalleDeuda?: DeudaInterface;
  deudaExtra?: DeudaExtra;

  public EstadoCuotaType = EstadoCuotaEnum;
  public EstadoDeudaType = EstadoDeudaEnum;

  constructor(
    private readonly businessService: BusinessService,
  ) { }

  obtenerDetalleCuotas() {
    if (this.mostrarDetalleAsignacion) {
      this.mostrarDetalleAsignacion = false;
      return;
    }

    this.mostrarDetalleAsignacion = true;
    this.detalleDeuda = undefined;
    this.businessService.methodGet<DeudaInterface, {}>({
      url: ENDPOINTS.deudas.detalle,
      params: [this.deuda.id.toString()],
    }).then(res => {
      const hoy = new Date();
      this.deudaExtra = {
        montoPagado: res.cuotas.filter(e => e.estadoCuota.id === EstadoCuotaEnum.Pagado)
          .reduce<number>((acum, value) => acum + value.montoTotal, 0),
        montoPendiente: res.cuotas.filter(e => e.estadoCuota.id !== EstadoCuotaEnum.Pagado)
          .reduce<number>((acum, value) => acum + value.montoTotal, 0),
        porcentaje: Math.floor((res.cuotas.filter(e => e.estadoCuota.id === EstadoCuotaEnum.Pagado).length / this.deuda.cantidadCuotas)
          * 100),
        cuotaProximaAVencer:
          res.cuotas
            .filter(e => e.estadoCuota.id !== EstadoCuotaEnum.Pagado &&
              new Date(e.fechaMaximaPago).getTime() > hoy.getTime())
            .sort((a, b) => a.fechaMaximaPago.localeCompare(b.fechaMaximaPago))[0]
      }
      this.detalleDeuda = res;
    }).catch(error => {
      console.log('error:', error);
    })

  }

}
