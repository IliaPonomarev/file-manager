import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { appConf } from 'src/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: appConf.bullQueue,
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}