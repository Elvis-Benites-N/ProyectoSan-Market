import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../controllers/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroCompletadoGuard implements CanActivate, CanLoad {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  canLoad(): boolean {
    return this.validate();
  }

  canActivate(): boolean {
    return this.validate();
  }

  private validate(): boolean {
    if (this.authService.getRegistroCompletado()) return true;

    this.router.navigateByUrl('/');

    return false;
  }

}
