interface AprobarPagoEventNamed {
  idPago: number;
  idPagoManual: number;
}
export class AprobarPagoEvent {
  constructor(private readonly data: AprobarPagoEventNamed) {}

  toString(): string {
    return JSON.stringify(this.data);
  }
}

interface RechazarPagoEventNamed {
  idPago: number;
  idPagoManual: number;
  observacion: string;
  finalizado: boolean;
}
export class RechazarPagoEvent {
  constructor(private readonly data: RechazarPagoEventNamed) {}
  toString(): string {
    return JSON.stringify(this.data);
  }
}
