import { CanActivate, ExecutionContext, HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { AuthException } from "../exceptions/auth.exception";
import { Users } from "./user.entity";

@Injectable()
export class CheckJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw AuthException.UnauthorizedError();
            }

            const user: Users = this.jwtService.verify(token);
            req.user = user;

            return true;
        } catch (err) {
            throw AuthException.UnauthorizedError();
        }
    }

}