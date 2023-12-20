import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'file-processing-queue',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}