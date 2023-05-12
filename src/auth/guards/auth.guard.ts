import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { Request } from 'express';
import { useToken } from 'src/utils/use.token';
import { IUsedToken } from '../interfaces/auth.interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    // Uso reflector para que vea si el controlador tiene un decorador con una metadata llamada PUBLIC_KEY (la puedo ver en public.decorator.ts)
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    // En el caso de que tenga ese decorador, dejará pasar
    if (isPublic) {
      console.log('Is Public!');
      return true;
    }

    // Caso de que no, con esto consigo el Request de la petición http
    const req = context.switchToHttp().getRequest<Request>();

    // Consigo el Token que estará dentro de authorization y le hago un split porque le envié un Bearer
    const token = req.headers['authorization']?.split(' ')[1] || [];

    // Caso de que no haya token o sea un array, significará que es invalido
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid Token');
    }

    // Aqui uso la funcion useToken para decodear el token, conseguir la información y de paso ver si es valido
    const manageToken: IUsedToken | string = useToken(token);

    // Caso de que el resultaod del decode sea un string, es que será invalido
    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    // Caso de que isExpired sea true, es porque expiró
    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token is Expired');
    }

    // Consigo el sub, que es el id del usuario, busco el usuario
    const { sub } = manageToken;
    const user = await this.userService.findById(sub);

    // Si no existe el usuario, envío usuario invalido
    if (!user) {
      throw new UnauthorizedException('Invalid User');
    }

    // Caso contrario agrego el id y rol del usuario al Req y finalmente devuelvo true para que avance
    req.idUser = user.id;
    req.roleUser = user.role;

    return true;
  }
}
