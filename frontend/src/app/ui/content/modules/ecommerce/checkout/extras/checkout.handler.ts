// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/internal/Observable';
// import { Subject } from 'rxjs/internal/Subject';

// @Injectable()
// export class CheckoutHandler {
//   private subject = new Subject<number>();
//   public pagoId!: number;

//   public tiposDeDocumento!: any[];

//   constructor() {}

//   public cambiarComponente(valor: number): void {
//     this.subject.next(valor);
//   }

//   public escuchar(): Observable<number> {
//     return this.subject.asObservable();
//   }
// }
