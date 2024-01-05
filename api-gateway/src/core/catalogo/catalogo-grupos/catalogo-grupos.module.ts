import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CatalogoGruposController } from './catalogo-grupos.controller';
import { CatalogoGruposService } from './catalogo-grupos.service';
import { MICROSERVICES } from '@Constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICES.CATALOGO.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'catalogo',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'catalogo-grupos-san-mar-api-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [CatalogoGruposController],
  providers: [CatalogoGruposService],
})
export class CatalogoGruposModule {}
