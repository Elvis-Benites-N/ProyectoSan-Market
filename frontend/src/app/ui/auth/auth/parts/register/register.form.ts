import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormWrapper } from "src/app/core/classes/form-wrapper.class";
import { RegisterRequest } from "src/app/core/controllers/services/auth/dto/register.dto";

export class RegisterForm extends FormWrapper<
    RegisterRequest, {
        email: FormControl<string | null>;
        password: FormControl<string | null>;
        confirmPassword: FormControl<string | null>;
        nombres: FormControl<string | null>;
        apellidos: FormControl<string | null>;
        facultadId: FormControl<number | null>;
        facultadNombre: FormControl<string | null>;
        facultadCodigo: FormControl<string | null>;
    }>{

    public async toRequest(): Promise<RegisterRequest> {
        const f = this.formulario.getRawValue();

        return {
            email: f.email!,
            password: f.password!,
            nombres: f.nombres!,
            apellidos: f.apellidos!,
            facultadId: f.facultadId!,
            facultadNombre: f.facultadNombre!,
            facultadCodigo: f.facultadCodigo!,
        }
    }

    protected inicializarFormulario(): void {
        this.formulario = new FormGroup({
            email: new FormControl<string | null>(null, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(120),
                Validators.email,
                Validators.pattern(/.*(?<!unmsm.edu.pe)$/),
            ]),
            password: new FormControl<string | null>(null, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(50),
            ]),
            confirmPassword: new FormControl<string | null>(null, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(50),
            ]),
            nombres: new FormControl<string | null>(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(75),
            ]),
            apellidos: new FormControl<string | null>(null, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(75),
            ]),
            facultadId: new FormControl<number | null>(null),
            facultadNombre: new FormControl<string | null>(null),
            facultadCodigo: new FormControl<string | null>(null),
        });
    }

    protected extraValidation(): boolean {
        const f = this.formulario.value;

        return f.password === f.confirmPassword;
    }

    protected deshabilitarCampos(): void {
    }

}