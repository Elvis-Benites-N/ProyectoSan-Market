import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsuarioInfo } from '../../dto/login.dto';

export const Usuario = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UsuarioInfo => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
