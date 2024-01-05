import { Module } from '@nestjs/common';
import { CatalogoItemsController } from './catalogo-items.controller';
import { CatalogoItemsService } from './catalogo-items.service';
import { MICROSERVICES } from '@Constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.CATALOGO.NAME,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'catalogo',
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
              groupId: 'catalogo-items-san-mar-api-consumer',
            },
          },
        }),
      },
    ]),
  ],
  controllers: [CatalogoItemsController],
  providers: [CatalogoItemsService],
})
export class CatalogoItemsModule {}
