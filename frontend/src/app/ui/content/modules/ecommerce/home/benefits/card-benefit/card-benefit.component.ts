import { Component, Input, OnInit } from '@angular/core';
import { BeneficiosInterface } from '../benefits.component';

@Component({
  selector: 'card-benefit',
  templateUrl: './card-benefit.component.html',
  styleUrls: ['./card-benefit.component.scss'],
})
export class CardBenefitComponent implements OnInit {

  @Input()
  benefit!: BeneficiosInterface;

  constructor() {}

  ngOnInit(): void {}
}
