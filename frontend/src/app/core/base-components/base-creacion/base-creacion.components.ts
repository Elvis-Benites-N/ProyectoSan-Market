import { Component, Inject, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormWrapper } from '../../classes/form-wrapper.class';
import { AuthService } from '../../controllers/services/auth/auth.service';
import { BusinessService } from '../../controllers/services/business/business.service';
import { ErrorUtil } from '../../utils/error.util';

@Component({
  selector: 'base-creacion',
  standalone: true,
  template: ``,
  styles: [],
})
export abstract class BaseCreacionComponent<
  IDataInput,
  CForm extends FormWrapper,
  IRequest,
  IResponse
> {
  protected businessService: BusinessService;
  protected authService: AuthService;
  protected notificationService: NzNotificationService;
  protected route: ActivatedRoute;
  protected router: Router;

  protected formWrapper!: CForm;
  protected data!: IDataInput;
  protected dataCargada = false;

  protected endpoint?: string;

  protected mostrarModalConfirmacion = false;

  constructor(
    private readonly injector: Injector,
    @Inject('endpoint')
    endpoint?: string
  ) {
    this.businessService = this.injector.get(BusinessService);
    this.authService = this.injector.get(AuthService);
    this.notificationService = this.injector.get(NzNotificationService);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.endpoint = endpoint;
    this.inicializarFormWrapperYData();
  }

  protected async onSubmit(): Promise<void> {
    if (this.formWrapper.enviandoFormulario) return;

    if (!this.formWrapper.validate()) {
      window.scrollTo({
        top: this.getTopPosition(),
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    try {
      this.formWrapper.deshabilitar();

      const response = await this.businessService.methodPost<
        IResponse,
        IRequest
      >(this.endpoint!, await this.formWrapper.toRequest());

      this.onSucessCall(response);
    } catch (error) {
      this.formWrapper.hasErrorFromAPI = true;
      this.formWrapper.errorMessageFromAPI =
        ErrorUtil.getApiErrorMessage(error);
      this.cerrarModalConfirmacion();
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 500);
      this.onErrorCall();
    } finally {
      this.formWrapper.habilitar();
    }
  }

  protected abrirModalConfirmacion() {
    if (this.formWrapper.enviandoFormulario) return;

    if (!this.formWrapper.validate()) {
      window.scrollTo({
        top: this.getTopPosition(),
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    this.mostrarModalConfirmacion = true;
  }

  protected cerrarModalConfirmacion = () => {
    this.mostrarModalConfirmacion = false;
  };

  abstract cargarData(): Promise<void>;
  abstract getTopPosition(): number;
  abstract onSucessCall(response: IResponse): void;
  abstract inicializarFormWrapperYData(): void;
  abstract onErrorCall(): void;
}
