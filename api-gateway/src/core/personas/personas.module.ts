import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@Constants';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: MICROSERVICES.PERSONAS.NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'personas',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'personas-cliente-personas-apigateway-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [PersonasController],
  providers: [PersonasService],
})
export class PersonasModule {}
