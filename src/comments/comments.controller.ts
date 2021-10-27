import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnCardsGuard } from 'src/cards/column-cards.guard';
import { UserColumnsGuard } from 'src/columns/user-columns.guard';
import { CheckJwtGuard } from 'src/users/check-jwt.guatd';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { Users } from 'src/users/user.entity';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';

@UseGuards(ColumnCardsGuard)
@Controller('users/:user_id/columns/:column_id/cards/:card_id/comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ) {}

    @Get()
    async findAll(@Param('card_id') card_id: string): Promise<Comments[]> {
        return this.commentsService.findAll(card_id);
    }

    @Get(':comment_id')
    async findOnde(@Param('comment_id') comment_id: string): Promise<Comments> {
        return this.commentsService.findById(comment_id, { relations: ["author"] });
    }
    
    @UseGuards(CheckJwtGuard, UserColumnsGuard)
    @Post()
    async create(
        @Body() comment: CreateCommentsDto,
        @Param('comment_id') comment_id: string,
        @User() user: Users
    ): Promise<CreateCommentsDto> {
        return this.commentsService.create(user, comment_id, comment);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':comment_id')
    async update(@Body() commentDto: CreateCommentsDto, @Param('comment_id') comment_id: string): Promise<CreateCommentsDto> {
        return this.commentsService.update(comment_id, commentDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':comment_id')
    async delete(@Param('comment_id') comment_id: string): Promise<boolean> {
        return this.commentsService.delete(comment_id)
    }
}
