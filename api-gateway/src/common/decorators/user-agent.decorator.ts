import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    let userAgent = req.headers['user-agent'];

    if(!userAgent){
        userAgent = 'Desconocido';
    }else if(typeof userAgent === 'string' || userAgent instanceof String){
        if(userAgent.length > 150){
            userAgent = userAgent.substring(0, 150);
        }
    }else{
        userAgent = 'Desconocido';
    }

    return  userAgent;
  }
);
