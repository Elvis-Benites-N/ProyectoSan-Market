import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Subscription } from 'rxjs/internal/Subscription';
import { BaseFiltroComponent } from 'src/app/core/base-components/base-filtro/base-filtro.component';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constant';
import { DeudasMaestrosQuery, DeudasMaestrosResponse } from 'src/app/core/controllers/services/business/dto/deudas/deudas-maestros.dto';
import { IntBooleanoEnum } from 'src/app/core/enums/int-booleano.enum';
import { TipoItemEnum } from 'src/app/core/enums/tipo-item.enum';
import { ObtenerDeudasForm } from 'src/app/core/interfaces/forms/deudas.form';
import { IdLabel } from 'src/app/core/interfaces/id-label.interface';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent
  extends BaseFiltroComponent<DeudasMaestrosResponse, DeudasMaestrosQuery>
  implements OnInit, OnDestroy {

  @Input()
  formulario!: FormGroup<ObtenerDeudasForm>;

  @Output()
  onFilterChange: EventEmitter<void>;

  tiposDeItem: IdLabel[];

  private subs: Subscription[];

  constructor(
    injector: Injector,
  ) {
    super(injector, {
      endpoint: ENDPOINTS.deudas.maestros,
    });
    this.tiposDeItem = [
      {
        id: TipoItemEnum.Servicio,
        label: 'SERVICIO',
      },
      {
        id: TipoItemEnum.TUPA,
        label: 'TUPA',
      },
    ];
    this.subs = [];
    this.onFilterChange = new EventEmitter();
  }


  ngOnInit(): void {
    this.subs.push(this.formulario.controls
      .itemNombre
      .valueChanges
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe(value => this.onFilterChange.emit()));
    this.subs.push(this.formulario.controls
      .tipoFiltroFecha.valueChanges.subscribe(value => this.onFilterChange.emit()));
  }

  toRequest(): DeudasMaestrosQuery {
    return {
      estados: IntBooleanoEnum.True,
      estadosCuota: IntBooleanoEnum.True,
    }
  }

  dataCargada(responses?: any[] | undefined): void {
  }

  resetear(): void {
    this.formulario.reset({
      estadoDeudaIds: [],
      itemNombre: '',
      tipoFiltroFecha: 4,
      tipoItemIds: [],
    }, { emitEvent: false });
    this.onFilterChange.emit();
  }

  toggleEstadoCuota(id: number) {
    if (this.formulario.value.estadoCuotaIds!.includes(id)) {
      this.formulario.value.estadoCuotaIds!.splice(
        this.formulario.value.estadoCuotaIds!.indexOf(id),
        1,
      );
      this.onFilterChange.emit();
      return;
    }

    this.formulario.value.estadoCuotaIds!.push(id);
    this.onFilterChange.emit();
  }

  limpiarEstadoCuota() {
    this.formulario.controls.estadoCuotaIds!.setValue([]);
    this.onFilterChange.emit();
  }

  toggleEstado(id: number) {
    if (this.formulario.value.estadoDeudaIds!.includes(id)) {
      this.formulario.value.estadoDeudaIds!.splice(
        this.formulario.value.estadoDeudaIds!.indexOf(id),
        1,
      );
      this.onFilterChange.emit();
      return;
    }

    this.formulario.value.estadoDeudaIds!.push(id);
    this.onFilterChange.emit();
  }

  limpiarEstado() {
    this.formulario.controls.estadoDeudaIds!.setValue([]);
    this.onFilterChange.emit();
  }

  toggleTipoItem(id: number) {
    if (this.formulario.value.tipoItemIds!.includes(id)) {
      this.formulario.value.tipoItemIds!.splice(
        this.formulario.value.tipoItemIds!.indexOf(id),
        1,
      );
      this.onFilterChange.emit();
      return;
    }

    this.formulario.value.tipoItemIds!.push(id);
    this.onFilterChange.emit();
  }

  limpiarTipoItem() {
    this.formulario.controls.tipoItemIds!.setValue([]);
    this.onFilterChange.emit();
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => e?.unsubscribe());
  }

}
