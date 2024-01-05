// import { Injectable } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { CrearPagoRequest } from 'src/app/core/controllers/services/business/dto/pagos/crear-pago.dto';

// @Injectable()
// export class CheckoutForm {
//   public readonly formulario = new FormGroup({
//     informacionDeFacturacion: new FormGroup({
//       tipoDeComprobante: new FormControl<number | null>(null, [Validators.required]),
//       tipoDeDocumentoDeIdentidad: new FormControl<number | null>(null, [
//         Validators.required,
//       ]),
//       numeroDeDocumento: new FormControl<string>('', [
//         Validators.required,
//         Validators.minLength(8),
//       ]),
//       nombres: new FormControl<string | null>(
//         {
//           value: null,
//           disabled: true,
//         },
//         [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
//       ),
//       apellidos: new FormControl<string | null>(
//         {
//           value: null,
//           disabled: true,
//         },
//         [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
//       ),
//       razonSocial: new FormControl<string | null>({
//         value: null,
//         disabled: true,
//       }),
//       direccion: new FormControl<string | null>({
//         value: null,
//         disabled: true,
//       }),
//       email: new FormControl<string>('', [
//         Validators.required,
//         Validators.minLength(5),
//         Validators.maxLength(50),
//         Validators.email,
//       ]),
//       guardaInformacion: new FormControl<boolean>(false),
//     }),
//     metodoDePago: new FormGroup({
//       metodoId: new FormControl<number | null>(null, [Validators.required]),
//     }),
//   });

//   public enviandoFormulario: boolean;
//   public hasErrorFromAPI: boolean;
//   public errorMessageFromAPI?: string;

//   constructor() {
//     this.enviandoFormulario = false;
//     this.hasErrorFromAPI = false;
//   }

//   isInvalid(
//     atributo:
//       | 'informacionDeFacturacion.tipoDocumentoDePago'
//       | 'informacionDeFacturacion.tipoDeDocumento'
//       | 'informacionDeFacturacion.numeroDeDocumento'
//       | 'informacionDeFacturacion.nombres'
//       | 'informacionDeFacturacion.apellidos'
//       | 'informacionDeFacturacion.email'
//       | 'informacionDeFacturacion.guardaInformacion'
//       | 'metodoDePago.metodoId'
//   ): boolean {
//     return false;
//     // if (this.formulario.get(atributo).disabled) return false;

//     // return (
//     //   this.formulario.get(atributo).invalid &&
//     //   this.formulario.get(atributo).dirty
//     // );
//   }

//   validate(): boolean {
//     if (this.formulario.invalid) {
//       Object.values(this.formulario.controls).forEach((control) => {
//         if (control.invalid) {
//           control.markAsDirty();
//           control.updateValueAndValidity({ onlySelf: true });
//         }
//       });
//       return false;
//     }
//     return true;
//   }

//   validateFacturacion(): boolean {
//     if (this.formulario.controls.informacionDeFacturacion.invalid) {
//       Object.values(
//         this.formulario.controls.informacionDeFacturacion.controls
//       ).forEach((control) => {
//         if (control.invalid) {
//           control.markAsDirty();
//           control.updateValueAndValidity({ onlySelf: true });
//         }
//       });
//       return false;
//     }
//     return true;
//   }

//   validateMetodoDePago(): boolean {
//     if (this.formulario.controls.metodoDePago.invalid) {
//       Object.values(this.formulario.controls.metodoDePago.controls).forEach(
//         (control) => {
//           if (control.invalid) {
//             control.markAsDirty();
//             control.updateValueAndValidity({ onlySelf: true });
//           }
//         }
//       );
//       return false;
//     }
//     return true;
//   }

//   toRequest(): CrearPagoRequest {
//     const value = this.formulario.getRawValue();

//     return {
//       codigoPago: '70346115',
//       comprobantePago: {
//         idTipoComprobante: value.informacionDeFacturacion.tipoDeComprobante!,
//         idTipoDocumento:
//           value.informacionDeFacturacion.tipoDeDocumentoDeIdentidad!,
//         numeroDocumento: value.informacionDeFacturacion.numeroDeDocumento!,
//         email: value.informacionDeFacturacion.email!,
//         apellidos: value.informacionDeFacturacion.apellidos!,
//         direccion: value.informacionDeFacturacion.direccion!,
//         nombres: value.informacionDeFacturacion.nombres!,
//         razonSocial: value.informacionDeFacturacion.razonSocial!,
//       },
//       informacionPago: {
//         idBancoUniversidad: value.metodoDePago.metodoId!,
//       },
//     };
//   }

//   prepararFormularioToAPI(): void {
//     this.enviandoFormulario = true;
//     this.hasErrorFromAPI = false;
//     this.errorMessageFromAPI = undefined;
//     this.formulario.disable();
//   }

//   resetear(): void {
//     this.enviandoFormulario = false;
//     this.hasErrorFromAPI = false;
//     this.errorMessageFromAPI = undefined;
//     this.formulario.enable();
//     this.formulario.reset();
//     this.formulario.controls.informacionDeFacturacion.controls.nombres.disable();
//     this.formulario.controls.informacionDeFacturacion.controls.apellidos.disable();
//     this.formulario.controls.informacionDeFacturacion.controls.razonSocial.disable();
//     this.formulario.controls.informacionDeFacturacion.controls.direccion.disable();
//   }
// }
