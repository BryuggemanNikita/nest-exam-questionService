import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const role = this.reflector.get(Role, context.getHandler());
        if (!role) {
            return true;
        }
        // const request = context.switchToHttp().getRequest();
        // const user = request.user;
        const testUser = { roles: ['ADMIN', 'USER'] };

        return testUser.roles.includes(role);
    }
}
