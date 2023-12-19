import { Controller, Post, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { FileProcessingService } from './file-processing.service';

@Controller('api/file-processing')
export class FileProcessingController {
  constructor(private readonly fileProcessingService: FileProcessingService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file): Promise<boolean> {
    try {
      await this.fileProcessingService.handleFile(file.buffer);
  
      return true;
    } catch(e) {
      return false;
    }
    
  }
}