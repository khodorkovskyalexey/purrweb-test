import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthException } from "src/exceptions/auth.exception";
import { AuthService } from "src/users/auth.service";
import { ColumnsService } from "./columns.service";

@Injectable()
export class UserColumnsGuard implements CanActivate {
    constructor(private columnService: ColumnsService) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        try {
            const column = await this.columnService.findById(req.params.column_id, { relations: ["user"] });
            const user_id: string = req.params.user_id || req.user.id
            
            if(column.user.id !== Number(user_id)) {
                throw AuthException.Forbidden("This column is not belong to this user");
            }

            return true;
        } catch (error) {
            throw AuthException.Forbidden("This column is not belong to this user");
        }
    }
}