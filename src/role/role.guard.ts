import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.getRoles(context);
                
        if (roles.length === 0) {
            return false; 
        }

        const request = context.switchToHttp().getRequest();             
        
        if(request.user){
            const user = await this.usersService.getUserById(request.user.sub);
            
            return roles.includes(user.userType);
        }
        return false
    }

    private getRoles(context: ExecutionContext): string[] {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (roles) {
            return roles;
        }
        return this.reflector.get<string[]>('roles', context.getClass()) || [];
    }
}
