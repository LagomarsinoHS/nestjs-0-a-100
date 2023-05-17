import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES } from 'src/constants';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from 'src/constants/key-decorators';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // Veo si la ruta tiene el decorador de es publico
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    // Consigo el role del usuario con el cual me logee
    const { roleUser, idUser } = context.switchToHttp().getRequest<Request>();

    const user = await this.userService.findById(idUser);

    // Veo si la ruta tiene el decorador de Admin
    const isAdmin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    // En el caso de que sea publico, dejo pasar
    // En el caso de que el role del usuario sea el que tiene is admin (si se le pasó el decorador), dejo pasar
    // En el caso de que roleUser sea ADMIN, dejo pasar
    if (isPublic || roleUser === isAdmin || roleUser === ROLES.ADMIN) {
      return true;
    }

    // Consigo los roles
    const getRoles =
      this.reflector.get<Array<keyof typeof ROLES>>(
        ROLES_KEY,
        context.getHandler(),
      ) || [];

    // Consigo el accessLevel
    const getAccessLevel =
      this.reflector.get<number>(ACCESS_LEVEL_KEY, context.getHandler()) || 0;

    // Busco el projecto relacionado con el accessLevel
    const userProject = user.projectsIncludes.find(
      (pro) => pro.accessLevel === getAccessLevel,
    );

    // Si no hay, no tiene permiso para editar ya que no pertenece
    if (!userProject) {
      throw new UnauthorizedException(`You don't belong to the project`);
    }
    if (getRoles.some((role) => role === roleUser)) return true;

    // Caso de que nada se cumpla, no lo dejo pasar
    throw new UnauthorizedException(`You don't have permission`);
  }
}
