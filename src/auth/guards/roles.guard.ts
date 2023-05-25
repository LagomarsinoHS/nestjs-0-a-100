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
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Veo si la ruta tiene el decorador de es publico
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    // Consigo el role del usuario con el cual me logee
    const { roleUser } = context.switchToHttp().getRequest<Request>();

    // Veo si la ruta tiene el decorador de Admin
    const isAdmin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    // En el caso de que sea publico, dejo pasar
    // En el caso de que el role del usuario sea el que tiene is admin (si se le pasó el decorador), dejo pasar
    // En el caso de que roleUser sea ADMIN, dejo pasar
    if (isPublic || roleUser === isAdmin || roleUser === ROLES.ADMIN) {
      return true;
    }

    const getRoles =
      this.reflector.get<Array<keyof typeof ROLES>>(
        ROLES_KEY,
        context.getHandler(),
      ) || [];

    if (getRoles.some((role) => role === roleUser)) return true;

    // Caso de que nada se cumpla, no lo dejo pasar
    throw new UnauthorizedException(`You don't have permission`);
  }
}
