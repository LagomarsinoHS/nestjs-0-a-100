import { ROLES } from 'src/constants';
import { UsersEntity } from 'src/users/entities/users.entity';

export interface IPayloadToken {
  sub: string;
  role: ROLES;
}

export interface ISignJWT {
  payload: any;
  secret: any;
  expires: number | string;
}

export interface IAuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUsedToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
export interface IAuthResponse {
  accessToken: string;
  user: UsersEntity;
}
