import { Component, Input, OnInit } from '@angular/core';
import { ItemCarritoResponse } from 'src/app/core/controllers/services/business/dto/carrito/carrito.dto';

@Component({
  selector: 'resumen-carrito-cuota',
  templateUrl: './resumen-carrito-cuota.component.html',
  styleUrls: ['./resumen-carrito-cuota.component.scss']
})
export class ResumenCarritoCuotaComponent implements OnInit {

  @Input()
  dataItemCarrito!: ItemCarritoResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
