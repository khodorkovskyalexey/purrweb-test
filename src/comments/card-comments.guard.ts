import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthException } from "src/exceptions/auth.exception";
import { CommentsService } from "./comments.service";

@Injectable()
export class CardCommentsGuard implements CanActivate {
    constructor(
        private commentsSerivce: CommentsService
    ) {}

    async canActivate(context: ExecutionContext) {
        const req: Request = context.switchToHttp().getRequest();
        try {
            const comment = await this.commentsSerivce.findById(req.params.comment_id, { relations: ["card"] })
            
            if(comment.card.id !== Number(req.params.card_id)) {
                throw AuthException.Forbidden("This comment is not belong to this card")
            }

            return true;
        } catch (error) {
            throw AuthException.Forbidden("This comment is not belong to this card")
        }
    }
}