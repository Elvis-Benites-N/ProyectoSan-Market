import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { UsuarioInfo } from 'src/app/core/controllers/services/auth/dto/login.dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public seMuestraSombra = false;
  public usuario: UsuarioInfo;

  public isHeaderMobile: boolean;

  private readonly breakpointMobile = 982;

  constructor(
    public readonly authService: AuthService,
  ) {
    this.usuario = this.authService.usuario;
    this.isHeaderMobile = window.innerWidth <= this.breakpointMobile;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.seMuestraSombra = window.pageYOffset > 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isHeaderMobile = event.target.innerWidth <= this.breakpointMobile;
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    window.location.reload();
  }

}
