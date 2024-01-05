import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { RouterMiddleware } from '@Configs';

@Module({
  imports: [ConfigModule.forRoot(), CoreModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RouterMiddleware).forRoutes('*');
  }
}
