import { Controller, Get, HttpCode, HttpStatus, Redirect, Render } from "@nestjs/common";

@Controller()
export class AppController {

  // 获取首页模板
  @Get()
  @Render('index')
  root() {
    return { message: '官网!' };
  }

  // 测试3d
  @Get('3d')
  @Render('3d')
  thirdD() {
    return { message: '3d' };
  }

  /**
   * 302重定向
   * 利用 302 重定向可以做广告跳转统计.
   */
  @Get('redirect_302')
  @HttpCode(HttpStatus.FOUND)
  @Redirect('http://localhost:3000', 302)
  redirect302() {
    setTimeout(() => {
      console.log('操作统计+1');
    }, 3000)
  }
}
