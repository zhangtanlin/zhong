<<<<<<< HEAD
import { Controller, Get, Render } from "@nestjs/common";
=======
import { Controller, Get } from '@nestjs/common';
>>>>>>> 1f5ae6d353d3cb15a2e6e4d94fcaf3bb131d9a70
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: '官网!' };
  }
}
