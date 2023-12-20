import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':taskId')
  async getTaskById(@Param('taskId') taskId: string) {
    return this.tasksService.getTaskById(taskId);
  }
}