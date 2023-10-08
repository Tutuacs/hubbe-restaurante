import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './Validation';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsuarioService,
  ) {}

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.userService.create(data);
  }
}
