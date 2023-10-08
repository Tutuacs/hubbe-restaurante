import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(contexty: ExecutionContext) {
    const request = contexty.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = await this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      request.token = data;

      request.user = await this.prisma.GetUsuarioById(data.id);
      
      return true;
    } catch (error) {
      return false;
    }
  }
}
