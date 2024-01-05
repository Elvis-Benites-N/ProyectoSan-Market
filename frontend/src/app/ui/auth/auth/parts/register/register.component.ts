import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constant';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { BusinessService } from 'src/app/core/controllers/services/business/business.service';
import { DependenciasMaestrosResponse } from 'src/app/core/controllers/services/business/dto/maestros/dependencias-maestros.dto';
import { EncryptUtil } from 'src/app/core/utils/encrypt.util';
import { ErrorUtil } from 'src/app/core/utils/error.util';
import { RegisterForm } from './register.form';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: RegisterForm;
  public showPassword = false;
  public showConfirmPassword = false;

  public dependenciasResponse?: DependenciasMaestrosResponse;
  public facultadIdSub?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly businessService: BusinessService,
  ) {
    this.registerForm = new RegisterForm();
  }

  ngOnInit(): void {
    this.businessService
      .methodGet<DependenciasMaestrosResponse, {}>(
        ENDPOINTS.maestros.facultadesYDependencias,
      )
      .then((res) => {
        this.dependenciasResponse = res;
      })
      .catch((e) => {});
    this.facultadIdSub =
      this.registerForm.formulario.controls.facultadId.valueChanges.subscribe(
        (value) => {
          if (!value) {
            this.registerForm.formulario.patchValue({
              facultadCodigo: null,
              facultadNombre: null,
            });
            return;
          }

          let unidep =
            this.dependenciasResponse!.facultades!.find(
              (e) => e.id === value,
            ) ??
            this.dependenciasResponse!.dependencias!.find(
              (e) => e.id === value,
            );

          if (!unidep) return;

          this.registerForm.formulario.patchValue({
            facultadCodigo: unidep.codigo,
            facultadNombre: unidep.descripcion,
          });
        },
      );
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.enviandoFormulario) return;

    if (!this.registerForm.validate()) {
      return;
    }

    try {
      this.registerForm.deshabilitar();

      const publicKeyResponse = await this.authService.publicKey({
        email: this.registerForm.formulario.getRawValue().email!,
      });

      const registerRequest = await this.registerForm.toRequest();
      registerRequest.password = EncryptUtil.encryptBase64(
        registerRequest.password,
        publicKeyResponse.secretKey,
      )!;

      await this.authService.register(registerRequest);

      this.router.navigateByUrl('/auth/registro-completado');
    } catch (error) {
      this.registerForm.hasErrorFromAPI = true;
      this.registerForm.errorMessageFromAPI =
        ErrorUtil.getApiErrorMessage(error);
    } finally {
      this.registerForm.habilitar();
    }
  }

  ngOnDestroy(): void {
    this.facultadIdSub?.unsubscribe();
  }
}
