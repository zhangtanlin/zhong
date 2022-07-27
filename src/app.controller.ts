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

// 控制器-测试3d
@Controller('/3d')
export class ThirdController {
  @Get()
  @Render('3d')
  root() {
    return { message: '3d' };
  }
}