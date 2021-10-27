import { CanActivate, ExecutionContext, HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthException } from "../exceptions/auth.exception";
import { Users } from "./user.entity";
import { AuthService } from "./auth.service";

@Injectable()
export class CheckJwtGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token: string = this.authService.getJwtInHeader(req)
            const user: Users = this.authService.verifyUser(token);

            req.user = user;

            return true;
        } catch (err) {
            throw AuthException.UnauthorizedError();
        }
    }

}