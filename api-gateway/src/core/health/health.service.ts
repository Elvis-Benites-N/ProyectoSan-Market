import { Injectable } from '@nestjs/common';
import { MSHealth } from './dto/ms-health.dto';
import { VERSION_ACTUAL } from 'src/common/constants/api-version.constant';
@Injectable()
export class HealthService {
  //Injectar microservicios en constructor
  constructor() {}
  async getAPIHealth(): Promise<MSHealth> {
    const informacionMS = await Promise.allSettled([
      // AGREGAR TANTOS METODOS COMO MS DE UTILICEN
      // TODO: CATALOGO, DEPENDENCIA, CORREOS, ARCHIVOS, REPORTES-EXCEL[HTTP]
      //EJEMPLO:
      //   this.getMicroservicioKafkaHealth(
      //     this.msCatalogo,
      //     MICROSERVICES.CATALOGO.ENDPOINTS.HEALTH
      //   ),
      {
        name: 'CATALOGO',
        statusCode: 200,
        statusName: 'OK',
        detail: null,
      },
      {
        name: 'DEPENDENCIA',
        statusCode: 200,
        statusName: 'OK',
        detail: null,
      },
    ]);

    const informacionVariablesDeEntorno = this.variablesEntornoCorrecto();

    const statusCode =
      informacionMS.every((e) => e.status === 'fulfilled') &&
      informacionMS.every(
        (e: any) => (e.value as MSHealth).statusCode === 200
      ) &&
      informacionVariablesDeEntorno.length === 0
        ? 200
        : 500;

    const msFulfilled = informacionMS.filter((e) => e.status === 'fulfilled');
    const msRejected = informacionMS.filter((e) => e.status === 'rejected');

    return {
      statusCode,
      statusName: statusCode == 200 ? 'OK' : 'Error',
      detail: {
        microserviciosRejected:
          msRejected.length === 0 ? null : msRejected.map((e: any) => e.reason),
        microserviciosError: msFulfilled.every(
          (e: any) => (e.value as MSHealth).statusCode === 200
        )
          ? null
          : msFulfilled
              .filter((e: any) => (e.value as MSHealth).statusCode !== 200)
              .map((e: any) => e.value),
        variablesDeEntorno:
          informacionVariablesDeEntorno.length === 0
            ? null
            : informacionVariablesDeEntorno,
      },
      version: VERSION_ACTUAL,
    };
  }

  private variablesEntornoCorrecto(): string[] {
    const messages: string[] = [];

    if (!process.env.PORT) {
      messages.push('{PORT} no ha sido configurado');
    }

    if (!process.env.CONTEXT) {
      messages.push('{CONTEXT} no ha sido configurado');
    }

    if (!process.env.CODIGO_APP) {
      messages.push('{CODIGO_APP} no ha sido configurado');
    }

    if (!process.env.JWT_ACCESS_KEY) {
      messages.push('{JWT_ACCESS_KEY} no ha sido configurado');
    }

    if (!process.env.JWT_REFRESH_KEY) {
      messages.push('{JWT_REFRESH_KEY} no ha sido configurado');
    }

    // if (!process.env.SERVICIO_REPORTES_URL) {
    //   messages.push('{SERVICIO_REPORTES_URL} no ha sido configurado');
    // }

    if (!process.env.FRONTEND_URL) {
      messages.push('{FRONTEND_URL} no ha sido configurado');
    }

    return messages;
  }
}
