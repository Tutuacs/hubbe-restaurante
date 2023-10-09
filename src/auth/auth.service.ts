import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './Validation';
import { PrismaService } from 'src/prisma/prisma.service';
import { env } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private readonly Jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  createToken(user: { email: string; role: number; id: string }) {
    return {
      token: this.Jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        {
          expiresIn: '1d',
          subject: user.id,
          issuer: `${env.JWT_ISSUER}`,
          audience: `${env.JWT_AUDIENCE}`,
        },
      ),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    };
  }

  checkToken(token: string) {
    try {
      const data = this.Jwt.verify(token, {
        secret: `${env.JWT_SECRET}`,
        issuer: `${env.JWT_ISSUER}`,
        audience: `${env.JWT_AUDIENCE}`,
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  ValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(data: LoginDto) {
    const login = await this.prisma.ExistLogin(data);
    return this.createToken(login);
  }
}
