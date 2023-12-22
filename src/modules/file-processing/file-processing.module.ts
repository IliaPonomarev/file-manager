import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FileProcessingController } from './file-processing.controller';
import { FileProcessingService } from './file-processing.service';
import { AuthModule } from '../auth/auth.module';
import { appConf } from 'src/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: appConf.bullQueue,
    }),
    AuthModule
  ],
  controllers: [FileProcessingController],
  providers: [FileProcessingService],
})
export class FileProcessingModule {}