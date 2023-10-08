import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/decorator/role-enum.filter';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requeridRoles = this.reflector.getAllAndOverride<Role[]>(Role, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(requeridRoles);

    if (!requeridRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const rolesFilted = requeridRoles.filter((role) => role === user.role);

    return rolesFilted.length > 0;
  }
}
