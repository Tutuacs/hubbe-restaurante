import { NestMiddleware, BadRequestException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class MongoIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (id && id.length !== 24) {
      throw new BadRequestException('Invalid ID!');
    }
    next();
  }
}