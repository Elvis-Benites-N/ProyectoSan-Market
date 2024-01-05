export interface PagoInterface {
  id: number;

  fechaCreacion: Date;

  fechaMaximaPago: Date;

  montoSinIgv: number;

  montoIgv: number;

  montoTotal: number;

  codigoPago: string;

  idUsuarioSanMarket: number;

  idBancoUniversidad: number;

  // RELACIONES
  comprobantePagoInterface: ComprobantePagoInterface;
  bancoUniversidadInterface: BancoUniversidadInterface;
  monedaInterface: MonedaInterface;
  estadoPagoInterface: EstadoPagoInterface;
  itemPagoInterface: ItemPagoInterface[];
  pagosBCPInterface: PagosBCPInterface[];
  manualPaymentInterface: ManualPaymentInterface[];
}

interface ComprobantePagoInterface {
  nombres: string;
  apellidos: string;
  razonSocial: string;
  direccion: string;
  email: string;
  idTipoComprobante: number;
  idTipoDocumento: number;
  numeroDocumento: string;
}

interface BancoUniversidadInterface {
  nombre: string;
}

interface MonedaInterface {
  descripcion: string;
  simbolo: string;
  eqSunat: string;
}

interface EstadoPagoInterface {
  descripcion: string;
}

interface ItemPagoInterface {
  cantidad: number;
  precioSinIgv: number;
  precioIgv: number;
  precioTotal: number;
  itemCatalogoInterface: ItemCatalogoInterface;
}
interface ItemCatalogoInterface {
  unidepId: number;
  unidepCodigo: string;
  unidepDescripcion: string;
  unidepPadreNivel2Id: number;
  unidepPadreNivel2Codigo: string;
  unidepPadreNivel2Descripcion: string;
  itemNombre: string;
  itemIGV: number;
  itemValorUnitario: number;
  itemPrecio: number;
  tipoAfectacionDescripcion: string;
  unidadMedidaDescripcion: string;
}

interface PagosBCPInterface {
  id: number;
  idPayment: number;
  paymentInterface: PaymentInterface;
}
interface PaymentInterface {
  operationDate: Date;
  operationNumber: number;
  financialEntityCode: string;
  channelCode: string;
  serviceId: number;
  customerId: number;
  paymentTypeCode: string;
  amountTotal: number;
}

interface ManualPaymentInterface {
  codigoOperacion: string;
  observacion: string;
  fechaRevision: Date;
  finalizado: boolean;
  esTransferenciaInterbancaria: boolean;
  idBancoProcedencia: number;
  bancoProcedenciaInterface: BancoProcedenciaInterface;
}
interface BancoProcedenciaInterface {
  nombre: string;
}
