import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { emitWarning } from "process";
import { UserService } from "src/user/user.service";
import { Role } from "./role.decorator";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService:UserService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.JWT_SECRET || 'ticket-management',
        });
    }

    async validate(payload:any){
        const user = await this.userService.findByEmail(payload.email);
        if(!user) throw new UnauthorizedException();

        return{
            id:payload.sub,
            email:payload.email,
            role:payload.role
        }
    }
}