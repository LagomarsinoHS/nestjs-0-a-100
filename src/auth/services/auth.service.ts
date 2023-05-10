import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from 'src/users/entities/users.entity';
import { IPayloadToken, ISignJWT } from '../interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    // Intento conseguir el usuario por username
    const userByUsername = await this.userService.findBy({
      key: 'username',
      value: username,
    });

    // Intento conseguir el usuario por email
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });

    // En caso de que ninguna exista, arrojo error
    if (!userByUsername && !userByEmail) {
      throw new UnauthorizedException('User didn"t exists in our DB');
    }

    // Valido la contraseña con la encriptada en BD
    const encryptPassword = userByUsername?.password || userByEmail.password;
    const match = await bcrypt.compare(password, encryptPassword);

    // Caso de que no haga match, arrojo error
    if (!match) throw new UnauthorizedException('Invalid Password.');

    // En caso de que todo vaya bien, genero el jwt y lo devuelvo junto a la informacion del usuario.
    const jwt = await this.generateJWT(userByUsername || userByEmail);
    return jwt;
  }

  private async signJWT({ payload, secret, expires }: ISignJWT) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  async generateJWT(user: UsersEntity): Promise<any> {
    const getUser = await this.userService.findById(user.id);

    const payload: IPayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accessToken: await this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user: getUser,
    };
  }
}
