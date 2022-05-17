import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { from, Observable } from "rxjs";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    return { message: '官网!' };
  }

  // 微服务测试-主项目的
  @Post('/base_ms')
  setMsTest(@Body() { text }: { text: string }): Observable<string> {
    return from(this.appService.msBaseTest(text));
  }

}
