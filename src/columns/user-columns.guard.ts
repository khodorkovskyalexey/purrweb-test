import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthException } from "src/exceptions/auth.exception";
import { ColumnsService } from "./columns.service";

@Injectable()
export class UserColumnsGuard implements CanActivate {
    constructor(private columnService: ColumnsService) {}

    async canActivate(context: ExecutionContext) {
        const req: Request = context.switchToHttp().getRequest();
        try {
            const column = await this.columnService.findById(req.params.column_id, { relations: ["user"] })
            if(column.user.id !== Number(req.params.user_id)) {
                throw AuthException.Forbidden("This column is not belong to this user")
            }

            return true;
        } catch (error) {
            throw AuthException.Forbidden("This column is not belong to this user")
        }
    }
}