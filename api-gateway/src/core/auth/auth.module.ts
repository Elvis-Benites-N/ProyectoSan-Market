import { MICROSERVICES } from '@Constants';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './jwt/access-token-jwt/auth.strategy';
import { RefreshStrategy } from './jwt/refresh-token-jwt/refresh.strategy';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.ACCESO.NAME,
        useFactory: () => ({
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
              groupId: 'acceso-san-mar-api-consumer',
            },
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, RefreshStrategy]
})
export class AuthModule {}
