import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { FileProcessingModule } from './modules/file-processing/file-processing.module';
import { BullModule } from '@nestjs/bull';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    AuthModule, 
    FileProcessingModule,
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
