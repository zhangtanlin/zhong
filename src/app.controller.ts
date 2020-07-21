import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {

  // 首页【常规用法】
  @Get()
  root() {
    return {
      name: '名称',
      phone: '+8615244444444',
      language: 'CH-ZN',
      version: '0.0.1',
    }
  }

}
