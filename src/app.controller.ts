import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { from, Observable } from "rxjs";
import { AppService } from './app.service';

@Controller()
export class AppController {

  @Get()
  @Render('index')
  root() {
    return { message: '官网!' };
  }

}
