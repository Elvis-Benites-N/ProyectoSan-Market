import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';
import { MaestrosController } from './maestros.controller';
import { MaestrosService } from './maestros.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICES.DEPENDENCIAS.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'dependencias',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'dependencias-maestros-san-mar-api-consumer',
          },
        },
      },
      {
        name: MICROSERVICES.PERSONAS.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'personas',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'personas-maestros-san-mar-api-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [MaestrosController],
  providers: [MaestrosService],
})
export class MaestrosModule {}
