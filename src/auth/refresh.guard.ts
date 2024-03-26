import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private config: ConfigService
        ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        
        if (!token) return false
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: this.config.get('REFRESH_TOKEN_SECRET')})
            request.user = payload          
            
        } catch (error) {
            return false
        }
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Refresh' ? token : undefined;
      }
}