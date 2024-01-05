import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { EncryptUtil } from 'src/app/core/utils/encrypt.util';
import { ErrorUtil } from 'src/app/core/utils/error.util';
import { LoginForm } from './login.form';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: LoginForm;
  public showPassword = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.loginForm = new LoginForm();
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.enviandoFormulario || !this.loginForm.validate())
      return;

    try {
      this.loginForm.deshabilitar();

      const publicKeyResponse = await this.authService.publicKey({
        email: this.loginForm.formulario.getRawValue().email!,
      });

      const loginRequest = await this.loginForm.toRequest();
      loginRequest.password = EncryptUtil.encryptBase64(
        loginRequest.password,
        publicKeyResponse.secretKey,
      )!;

      await this.authService.login(loginRequest);

      this.router.navigateByUrl('/');
    } catch (error) {
      this.loginForm.hasErrorFromAPI = true;
      this.loginForm.errorMessageFromAPI =
        ErrorUtil.getApiErrorMessage(error);
    } finally {
      this.loginForm.habilitar();
    }
  }

}
