import { Injectable, NotFoundException } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class TasksService {
  constructor(
    @InjectQueue('file-processing-queue') private readonly queue: Queue
  ) {}

  async getAllTasks() {
    const jobs = await this.queue.getJobs(['active', 'waiting', 'completed', 'failed']);

    const tasks = jobs.map(async (job) => ({
      id: job.id,
      data: job.data,
      status: await job.getState(),
    }));

    return Promise.all(tasks);
  }

  async getTaskById(taskId: string) {
    const job = await this.queue.getJob(taskId);
    if (!job) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    
    const status = await job.getState();

    return { id: job.id, result: job.returnvalue, status };
  }
}