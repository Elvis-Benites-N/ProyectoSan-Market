import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzTypographyModule,
    NzSpaceModule,
    RouterModule,
  ],
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.scss']
})
export class VerificacionPage implements OnInit {

  public estaVerificandoCuenta: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
  ) {
    this.estaVerificandoCuenta = true;
  }

  ngOnInit(): void {
    const token: string = this.route.snapshot.queryParams['token'];
    const usuario: string = this.route.snapshot.queryParams['usuario'];

    if (!token || !usuario) return;

    this.authService.verify({
      token,
      usuarioId: Number(usuario),
    }).then(() => {
      this.authService.clearRegistroCompletado();
      this.estaVerificandoCuenta = false;
    }).catch(error => {
      console.log('error:', error);
    })
  }

}
