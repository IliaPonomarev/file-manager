import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FileProcessingController } from './file-processing.controller';
import { FileProcessingService } from './file-processing.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'file-processing-queue',
    }),
    AuthModule
  ],
  controllers: [FileProcessingController],
  providers: [FileProcessingService],
})
export class FileProcessingModule {}