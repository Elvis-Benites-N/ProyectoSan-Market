import { Component, OnInit, ViewEncapsulation } from '@angular/core';

export interface BeneficiosInterface {
  titulo: string;
  subTitulo: string;
  img: string;
}

@Component({
  selector: 'benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BenefitsComponent implements OnInit {
  public beneficios: BeneficiosInterface[];

  constructor() {
    this.beneficios = [
      {
        titulo: 'Compra y paga sin complicaciones',
        subTitulo:
          'Con opciones de pago rápidas y seguras, ¡tus pagos universitarios son tan sencillos como hacer un clic!',
        img: 'assets/images/ecommerce/home/beneficio1.svg',
      },
      {
        titulo: 'Acceso las 24 horas del día',
        subTitulo:
          'SanMarket te ofrece la libertad de comprar cuando quieras, en cualquier momento del día o de la noche.',
        img: 'assets/images/ecommerce/home/beneficio2.svg',
      },
      {
        titulo: 'Tu seguridad es prioridad',
        subTitulo:
          'Puedes relajarte y explorar la tienda con total tranquilidad sabiendo que tu información está protegida.',
        img: 'assets/images/ecommerce/home/beneficio3.svg',
      },
      {
        titulo: 'Ahorra comprando en SanMarket',
        subTitulo:
          'En cada compra, solo pagarás una comisión justa, sin costos ocultos ni sorpresivos.',
        img: 'assets/images/ecommerce/home/beneficio4.svg',
      },
    ];
  }

  ngOnInit(): void {}
}
