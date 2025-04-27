import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Hello')
@UseGuards(AuthGuard('jwt'))
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: "Hello API" })
  getHello(): string {
    return this.appService.getHello();
  }
}
