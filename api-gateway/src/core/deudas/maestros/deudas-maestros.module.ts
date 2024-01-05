import { Module } from '@nestjs/common';
import { DeudasMaestrosController } from './deudas-maestros.controller';
import { DeudasMaestrosService } from './deudas-maestros.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@/common/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICES.DEUDAS.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'personas',
            brokers: [process.env.KAFKA_BROKER],
            ssl: process.env.KAFKA_SSL_USE === 'true',
            sasl:
              process.env.KAFKA_SSL_USE === 'true'
                ? {
                    mechanism: 'plain',
                    username: process.env.KAFKA_SSL_USERNAME,
                    password: process.env.KAFKA_SSL_PASSWORD,
                  }
                : null,
          },
          consumer: {
            groupId: 'deudas-san-market-api-consumer',
          },
        },
      },
    ]),
    DeudasMaestrosModule,
  ],
  controllers: [DeudasMaestrosController],
  providers: [DeudasMaestrosService],
})
export class DeudasMaestrosModule {}
