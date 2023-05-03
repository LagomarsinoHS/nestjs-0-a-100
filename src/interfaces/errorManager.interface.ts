import { HttpStatus } from '@nestjs/common';

export interface IErrorManager {
  code: keyof typeof HttpStatus;
  message: string;
}
