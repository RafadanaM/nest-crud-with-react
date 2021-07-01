import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { RoleEntity } from 'src/role/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEntity[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('ROLEGUARD ' + user.roles);

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
