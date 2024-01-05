import { Module } from '@nestjs/common';
import { PerfilesController } from './perfiles.controller';
import { PerfilesService } from './perfiles.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@/common/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICES.ACCESO.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'acceso',
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
            groupId: 'acceso-perfiles-san-market-api-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [PerfilesController],
  providers: [PerfilesService],
})
export class PerfilesModule {}
