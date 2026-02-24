import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleType } from "src/role/role.entity";
import { ROLE_KEY } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const reqRole = this.reflector.getAllAndOverride<RoleType>(ROLE_KEY,[
            context.getHandler(),
            context.getClass()
        ]);

        if(!reqRole) return true;

        const {user} = context.switchToHttp().getRequest();

        if(!user || (!user.role && !user.role)){
            throw new ForbiddenException('User role is invalid')
        }

        const hasRole = reqRole.includes(user.role);

        if(!hasRole) throw new ForbiddenException('Permission denied');
        return hasRole;
    }

}