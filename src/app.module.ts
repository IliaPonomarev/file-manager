import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { FileProcessingModule } from './modules/file-processing/file-processing.module';
import { BullModule } from '@nestjs/bull';
import { TasksModule } from './modules/tasks/tasks.module';
import { AppLoggerMiddleware } from './middlewares/logger.middleware';
import { NestMinioModule  } from 'nestjs-minio';
import { ConfigModule } from '@nestjs/config';
import { appConf } from 'src/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: appConf.redisHost,
          port: appConf.redisPort,
        },
      }),
    }),
    NestMinioModule.register({
      endPoint: appConf.minioEndPoint,
      port: appConf.minioPort,
      useSSL: false,
      accessKey: appConf.minioAccessKey,
      secretKey: appConf.minioSecretKey,
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
