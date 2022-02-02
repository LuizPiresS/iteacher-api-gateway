import { Body, Controller, Logger, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('api/v1')
export class AppController {
  logger = new Logger(AppController.name);

  private clientUser: ClientProxy;
  constructor() {
    this.clientUser = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/iteacher'],
        queue: 'create-user',
      },
    });
  }

  @ApiTags('Users')
  @Post('users')
  async createUser(@Body() user: CreateUserDto) {
    return await this.clientUser.emit('create-user', user);
  }
}
