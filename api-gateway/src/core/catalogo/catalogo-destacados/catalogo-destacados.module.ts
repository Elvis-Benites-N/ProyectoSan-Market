import { Module } from '@nestjs/common';
import { CatalogoDestacadosService } from './catalogo-destacados.service';
import { CatalogoDestacadosController } from './catalogo-destacados.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
            groupId: 'catalogo-destacados-cliente-apigateway-consumer',
          },
        },
      },
    ]),
  ],
  providers: [CatalogoDestacadosService],
  controllers: [CatalogoDestacadosController],
})
export class CatalogoDestacadosModule {}
