import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findUsers() {
    try {
      return this.usersService.find();
    } catch (error) {
      Logger.error(error);
    }
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    try {
      return this.usersService.findById(id);
    } catch (error) {
      Logger.error(error);
    }
  }

  @Post()
  createUser(@Body() user: UserDto) {
    try {
      return this.usersService.create(user);
    } catch (error) {
      Logger.error(error);
    }
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: Partial<UserDto>) {
    try {
      return this.usersService.updateById(id, user);
    } catch (error) {
      Logger.error(error);
    }
  }
}
