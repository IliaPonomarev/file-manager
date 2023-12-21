import { Injectable } from '@nestjs/common';
import { mkdir, writeFile } from 'node:fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { NestMinioService } from 'nestjs-minio';

@Injectable()
export class FileProcessingService {
  
  constructor(
    @InjectQueue('file-processing-queue') private readonly fileProcessingQueue: Queue,
    private readonly minioService: NestMinioService
  ) {}

  async handleFile(fileBuffer: Buffer): Promise<void> {
    try {
      const uidFileName = `${uuidv4()}.xlsx`;

      const minioClient = await this.minioService.getMinio();
      const bucketName = 'file-processing';

      const bucketExists = await minioClient.bucketExists(bucketName);

      if (!bucketExists) {
        await minioClient.makeBucket(bucketName);
      }
      
      await minioClient.putObject(bucketName, uidFileName, fileBuffer);
      
      const taskData = { fileName: uidFileName };
  
      await this.fileProcessingQueue.add('processFile', taskData);
    } catch(e) {
      console.log(e);
      throw e;
    }

  }
}