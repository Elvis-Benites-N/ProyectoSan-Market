import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TipoItemEnum } from 'src/app/core/enums/tipo-item.enum';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'tag-tipo-item[tipoItemId][tipoItemDescripcion]',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
  ],
  templateUrl: './tag-tipo-item.component.html',
  styleUrls: ['./tag-tipo-item.component.scss']
})
export class TagTipoItemComponent implements OnInit {

  @Input()
  tipoItemId!: number;

  @Input()
  tipoItemDescripcion!: string;

  public readonly TipoItemType = TipoItemEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
