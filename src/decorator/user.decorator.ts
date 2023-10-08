import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';

export const Token = createParamDecorator((filter: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if(req.user){
    if(filter){
        return req.user[filter];
    }else{
        return req.user;
    }
  }else{
    throw new NotFoundException('Token não encontrado');
  }
});