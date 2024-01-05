import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICES.PAGOS.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'pagos',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'pagos-san-mar-api-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
