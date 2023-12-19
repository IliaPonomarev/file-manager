import { Injectable } from '@nestjs/common';
import { mkdir, writeFile } from 'node:fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class FileProcessingService {
  constructor(@InjectQueue('file-processing-queue') private readonly fileProcessingQueue: Queue) {}

  async handleFile(fileBuffer: Buffer): Promise<void> {
    const uidFileName = `${uuidv4()}.xlsx`;

    const directoryPath = path.join(__dirname, '..', '..', '..', 'files');
    const filePath = path.join(directoryPath, uidFileName);

    await mkdir(directoryPath, { recursive: true });
    await writeFile(filePath, fileBuffer);
    
    const taskData = { fileName: uidFileName };

    await this.fileProcessingQueue.add('processFile', taskData);
  }
}