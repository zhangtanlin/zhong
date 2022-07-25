import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {

  // 获取首页模板
  @Get()
  @Render('index')
  root() {
    return { message: '官网!' };
  }

}
