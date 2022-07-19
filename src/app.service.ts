import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

}



















