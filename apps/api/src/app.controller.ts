import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService, PreviewMetadata } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/health')
  health() {
    return { status: 'ok' };
  }

  @Get('/preview')
  getPreview(@Query('url') url: string): Promise<PreviewMetadata> {
    return this.appService.getPreview(url);
  }

  @Post('/preview')
  getPreviewPost(@Body('url') url: string): Promise<PreviewMetadata> {
    return this.appService.getPreview(url);
  }
}
