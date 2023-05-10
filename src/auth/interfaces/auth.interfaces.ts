import { ROLES } from 'src/constants';

export interface IPayloadToken {
  sub: string;
  role: ROLES;
}

export interface ISignJWT {
  payload: any;
  secret: any;
  expires: number | string;
}
