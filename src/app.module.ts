import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { FileProcessingModule } from './modules/file-processing/file-processing.module';
import { BullModule } from '@nestjs/bull';
import { TasksModule } from './modules/tasks/tasks.module';
import { AppLoggerMiddleware } from './middlewares/logger.middleware';
import { NestMinioModule  } from 'nestjs-minio';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'redis',
          port: 6379,
        },
      }),
    }),
    NestMinioModule.register({
      endPoint: 'minio',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    }),
    AuthModule, 
    FileProcessingModule,
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
