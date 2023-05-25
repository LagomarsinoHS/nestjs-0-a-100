import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../dto/user.dto';
import { UserProjectDTO } from '../dto/user-project.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Este decorador hace que no se me pida un token para generar la consulta
  @PublicAccess()
  @Get()
  async findUsers() {
    try {
      return await this.usersService.find();
    } catch (error) {
      Logger.error(error);
    }
  }

  // Este decorador es para enviar los roles que tienen permiso para acceder a la ruta, dentro del guard asociado esta la logica
  @Roles('BASIC')
  // Este decorador indica que solo puedes ser admin para acceder, tambien asociado al guard asociado a roles
  //@AdminAccess()
  @Get(':id')
  @ApiParam({ name: 'id' })
  async findUserById(@Param('id') id: string) {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      Logger.error(error);
    }
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    try {
      return await this.usersService.create(user);
    } catch (error) {
      Logger.error(error);
    }
  }

  @Post('add-to-project')
  async addToProject(@Body() userProject: UserProjectDTO) {
    try {
      return await this.usersService.createUP(userProject);
    } catch (error) {
      Logger.error(error);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: Partial<UserDTO>) {
    try {
      return await this.usersService.updateById(id, user);
    } catch (error) {
      Logger.error(error);
    }
  }
}
