import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'in-development',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './in-development.component.html',
  styleUrls: ['./in-development.component.scss']
})
export class InDevelopmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
