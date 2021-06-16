import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LogMiddleware } from './middleware/log.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }]
})
export class CommonModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    // '*' Apply for all endpoints
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
