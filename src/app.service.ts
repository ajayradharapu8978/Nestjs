import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hii! This is Ajay Radharapu. Welcome to NestJs`;
  }
}
