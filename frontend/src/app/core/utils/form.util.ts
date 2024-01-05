import {
  AbstractControl,
  FormArray,
  FormGroup
} from '@angular/forms';

export namespace FormUtil {
  export function isInvalidForm<
    TControl extends {
      [K in keyof TControl]: AbstractControl<any, any>;
    } = any
  >(formulario: FormGroup<TControl>): boolean {
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach((control) => {
        if (control instanceof FormArray) {
          control.controls.forEach((fg) => {
            isInvalidForm(fg as FormGroup);
          });
          return;
        }

        if (control instanceof FormGroup) {
          isInvalidForm(control);
          return;
        }

        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return true;
    }

    return false;
  }

  export function getErrorMessage(
    FC: AbstractControl,
    etiqueta: string
  ): string {
    if (!FC.errors) return '';

    if (FC.errors['required']) return 'FORM_ERRORS.REQUIRED';

    // if (FC.errors['minlength'])
    //   return `Debe ingresar mínimo ${FC.errors['minlength']['requiredLength']} caracteres`;

    // if (FC.errors['maxlength'])
    //   return `Máximo puede ingresar ${FC.errors['maxlength']['requiredLength']} caracteres`;

    // if (FC.errors['email'])
    //   return `El campo ${etiqueta} debe ser correo electrónico`;

    // if (FC.errors['pattern'])
    //   return `El campo ${etiqueta} no cumple con el patrón`;

    return 'FORM_ERRORS.DEFAULT';
  }

  export function markAsError(FC: AbstractControl): void {
    FC.markAsDirty();
    FC.updateValueAndValidity({ onlySelf: true });
  }
}
