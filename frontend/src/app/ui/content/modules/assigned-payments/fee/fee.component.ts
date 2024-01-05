import { Component, Input } from '@angular/core';
import { CarritoManager } from 'src/app/core/controllers/managers/carrito/carrito.manager';
import { CuotaInterface } from 'src/app/core/controllers/services/business/dto/deudas/deuda.dto';
import { EstadoCuotaEnum } from 'src/app/core/enums/estado-cuota.enum';
import { TipoItemCarritoEnum } from 'src/app/core/enums/tipoItemCarrito.enum';

@Component({
  selector: 'fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent {

  @Input()
  cuota!: CuotaInterface;

  @Input()
  monedaSimbolo!: string;

  public EstadoCuotaType = EstadoCuotaEnum;

  procesandoPeticion = false;

  constructor(
    private readonly carritoManager: CarritoManager,
  ) { }

  agregarItemCarrito() {
    if (this.procesandoPeticion) return;

    this.procesandoPeticion = true;
    this.carritoManager.agregarItemCarrito(
      { id: this.cuota.id } as any,
      TipoItemCarritoEnum.Cuota
    ).then(() => { })
      .catch()
      .finally(() => {
        this.procesandoPeticion = false;
      });
  }

}
