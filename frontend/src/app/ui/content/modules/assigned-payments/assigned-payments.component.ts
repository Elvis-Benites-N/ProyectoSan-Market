import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseListadoComponent } from 'src/app/core/base-components/base-listado/base-listado.component';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constant';
import { DeudaView, ObtenerDeudasQuery } from 'src/app/core/controllers/services/business/dto/deudas/listado-deuda.dto';
import { ObtenerDeudasForm } from 'src/app/core/interfaces/forms/deudas.form';

@Component({
  selector: 'app-assigned-payments',
  templateUrl: './assigned-payments.component.html',
  styleUrls: ['./assigned-payments.component.scss']
})
export class AssignedPaymentsPage
  extends BaseListadoComponent<
  DeudaView,
  ObtenerDeudasQuery,
  ObtenerDeudasForm
  >
  implements OnInit {

  constructor(injector: Injector) {
    super(injector, {
      endpoint: ENDPOINTS.deudas.todos,
      formulario: new FormGroup({
        itemNombre: new FormControl(''),
        tipoItemIds: new FormControl<number[] | null>([]),
        estadoDeudaIds: new FormControl<number[] | null>([]),
        estadoCuotaIds: new FormControl<number[] | null>([]),
        tipoFiltroFecha: new FormControl(4),
      }),
      dataPagination: {
        limit: 6,
      }
    });
  }

  ngOnInit(): void {
    this.cargarData();
  }

  toRequest(): ObtenerDeudasQuery {
    return {
      itemNombre: this.formulario.value.itemNombre,
      tipoItemIds: this.formulario.value.tipoItemIds?.join(','),
      estadoDeudaIds: this.formulario.value.estadoDeudaIds?.join(','),
      primeraCuotaEstadoIds: this.formulario.value.estadoCuotaIds?.join(','),
      tipoFiltroFechaEnum: this.formulario.value.tipoFiltroFecha,
      limit: this.dataPagination.limit,
      offset: this.dataPagination.offset,
      esPaginado: this.dataPagination.esPaginado,
    };
  }

}
