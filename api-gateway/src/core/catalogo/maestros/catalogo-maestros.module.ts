import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';
import { CatalogoMaestrosController } from './catalogo-maestros.controller';
import { CatalogoMaestrosService } from './catalogo-maestros.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: MICROSERVICES.CATALOGO.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'catalogo',
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: 'catalogo-maestros-san-mar-api-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [CatalogoMaestrosController],
  providers: [CatalogoMaestrosService],
})
export class CatalogoMaestrosModule {}
