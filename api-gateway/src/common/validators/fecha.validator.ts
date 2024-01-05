import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'fechaFiltro', async: false })
export class FechaFiltro implements ValidatorConstraintInterface {
  validate(text: string) {
    return fechaFiltro(text);
  }

  defaultMessage() {
    return 'La fecha debe ser formato DD-MM-YYYY y el año estar entre 2020 y 2025';
  }
}

function fechaFiltro(fecha: string): boolean {
  const regex =
    /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  if (regex.test(fecha)) {
    const year = fecha.split('-')[2];

    if (Number(year) < 2020 || Number(year) > 2030) return false;

    return true;
  }

  return false;
}
