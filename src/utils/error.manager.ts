import { HttpException, HttpStatus } from '@nestjs/common';
import { IErrorManager } from 'src/interfaces/errorManager.interface';

export class ErrorManager extends Error {
  constructor({ code, message }: IErrorManager) {
    super(`${code} :: ${message}`);
  }

  public static createSignatureError(msg: string) {
    const [code, message] = msg.split(' :: ');
    if (code) {
      throw new HttpException(msg, HttpStatus[code]);
    } else {
      throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
