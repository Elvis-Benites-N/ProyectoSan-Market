import { Component, Input, OnInit } from '@angular/core';
import { ItemCarritoResponse } from 'src/app/core/controllers/services/business/dto/carrito/carrito.dto';

@Component({
  selector: 'resumen-carrito-grupo',
  templateUrl: './resumen-carrito-grupo.component.html',
  styleUrls: ['./resumen-carrito-grupo.component.scss'],
})
export class ResumenCarritoGrupoComponent implements OnInit {
  @Input()
  dataItemCarrito!: ItemCarritoResponse;

  constructor() {}

  ngOnInit(): void {}
}
