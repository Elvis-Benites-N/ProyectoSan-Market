import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CarritoController } from './carrito.controller';
import { CarritoService } from './carrito.service';
import { MICROSERVICES } from '@/common/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICES.CARRITO.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'carrito',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'carrito-san-mar-api-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [CarritoController],
  providers: [CarritoService],
})
export class CarritoModule {}
