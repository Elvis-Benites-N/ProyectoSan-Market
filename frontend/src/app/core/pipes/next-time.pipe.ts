import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nextTime',
  standalone: true
})
export class NextTimePipe implements PipeTransform {

  transform(fechaString: string): string {
    const ahora = new Date();
    const fecha = new Date(fechaString);

    const diferencia = fecha.getTime() - ahora.getTime();
    const diferenciaEnDias = Math.ceil(diferencia / 1000 / 86400);

    if (diferenciaEnDias < 7) {

      if (diferenciaEnDias === 1)
        return `${diferenciaEnDias} día`;

      return `${diferenciaEnDias} días`;
    }

    if (diferenciaEnDias < 30) {

      const diferenciaEnSemanas = Math.ceil(diferenciaEnDias / 7);

      if (diferenciaEnSemanas === 1)
        return `${diferenciaEnSemanas} semana`;

      return `${diferenciaEnSemanas} semanas`;
    }

    return `processing...`;
  }

}
