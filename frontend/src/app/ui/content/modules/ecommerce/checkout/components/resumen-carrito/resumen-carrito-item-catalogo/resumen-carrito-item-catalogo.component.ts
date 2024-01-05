import { Component, Input, OnInit } from '@angular/core';
import { ItemCarritoResponse } from 'src/app/core/controllers/services/business/dto/carrito/carrito.dto';

@Component({
  selector: 'resumen-carrito-item-catalogo',
  templateUrl: './resumen-carrito-item-catalogo.component.html',
  styleUrls: ['./resumen-carrito-item-catalogo.component.scss'],
})
export class ResumenCarritoItemCatalogoComponent implements OnInit {
  @Input()
  dataItemCarrito!: ItemCarritoResponse;

  constructor() {}

  ngOnInit(): void {}
}
