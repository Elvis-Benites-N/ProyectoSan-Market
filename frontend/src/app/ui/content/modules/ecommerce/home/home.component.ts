import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showOutside = false;

  private readonly breakpointMobile = 1071;

  constructor() {
    this.showOutside = window.innerWidth > this.breakpointMobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.showOutside = event.target.innerWidth > this.breakpointMobile;
  }

}
