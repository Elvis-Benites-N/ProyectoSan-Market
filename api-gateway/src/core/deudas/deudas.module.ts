import { Module } from '@nestjs/common';
import { DeudasController } from './deudas.controller';
import { DeudasService } from './deudas.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@/common/constants';
import { DeudasMaestrosModule } from './maestros/deudas-maestros.module';

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
  controllers: [DeudasController],
  providers: [DeudasService],
})
export class DeudasModule {}
