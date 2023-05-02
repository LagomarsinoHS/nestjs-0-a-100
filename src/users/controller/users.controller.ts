import { Controller, Get, Logger } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  sayHello() {
    try {
      return this.usersService.sayHello();
    } catch (error) {
      Logger.error(error);
    }
  }
}
