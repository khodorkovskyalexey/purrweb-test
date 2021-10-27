import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthException } from "src/exceptions/auth.exception";
import { ColumnsService } from "./columns.service";

@Injectable()
export class UserColumnsGuard implements CanActivate {
    constructor(private columnService: ColumnsService) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        try {
            const { user } = req;
            
            const column = await this.columnService.findById(req.params.column_id, { relations: ["user"] })
            const isColumnBelongToUser: boolean = column.user?.id === user.id;
            if(!isColumnBelongToUser) {
                throw AuthException.Forbidden()
            }

            return true;
        } catch (error) {
            throw AuthException.Forbidden()
        }
    }
}