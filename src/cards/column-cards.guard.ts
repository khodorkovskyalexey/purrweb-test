import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ColumnsService } from "src/columns/columns.service";
import { AuthException } from "src/exceptions/auth.exception";
import { CardsService } from "./cards.service";

@Injectable()
export class ColumnCardsGuard implements CanActivate {
    constructor(
        private cardsSerivce: CardsService
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        try {
            const card = await this.cardsSerivce.findById(req.params.card_id, { relations: ["column"] })
            if(card.column.id !== Number(req.params.column_id)) {
                throw AuthException.Forbidden()
            }

            return true;
        } catch (error) {
            throw AuthException.Forbidden()
        }
    }
}