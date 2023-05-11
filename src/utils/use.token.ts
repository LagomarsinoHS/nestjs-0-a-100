import {
  IAuthTokenResult,
  IUsedToken,
} from 'src/auth/interfaces/auth.interfaces';
import * as jwt from 'jsonwebtoken';
export const useToken = (token: string): IUsedToken | string => {
  try {
    const decode = jwt.decode(token) as IAuthTokenResult;

    const currentDate = new Date().getTime();
    const expiredDate = new Date(decode.exp).getTime();
    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: expiredDate <= currentDate,
    };
  } catch (error) {
    return 'Token is expired or invalid.';
  }
};
