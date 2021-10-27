import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnCardsGuard } from 'src/cards/column-cards.guard';
import { UserColumnsGuard } from 'src/columns/user-columns.guard';
import { CheckJwtGuard } from 'src/users/check-jwt.guatd';
import { User } from 'src/users/user.decorator';
import { Users } from 'src/users/user.entity';
import { CardCommentsGuard } from './card-comments.guard';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Comments module')
@UseGuards(ColumnCardsGuard)
@Controller('columns/:column_id/cards/:card_id/comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ) {}

    @ApiOperation({ summary: 'Get all comments by cards id' })
    @ApiResponse({ status: 200, type: [Comments] })
    @Get()
    async findAll(@Param('card_id') card_id: string): Promise<Comments[]> {
        return this.commentsService.findAll(card_id);
    }

    @ApiOperation({ summary: 'Get one comments by id' })
    @ApiResponse({ status: 200, type: Comments })
    @Get(':comment_id')
    async findOnde(@Param('comment_id') comment_id: string): Promise<Comments> {
        return this.commentsService.findById(comment_id, { relations: ["author"] });
    }
    
    @ApiOperation({ summary: 'Create new comment' })
    @ApiResponse({ status: 200, type: CreateCommentsDto })
    @UseGuards(CheckJwtGuard, UserColumnsGuard, CardCommentsGuard)
    @Post()
    async create(
        @Body() comment: CreateCommentsDto,
        @Param('comment_id') comment_id: string,
        @User() user: Users
    ): Promise<CreateCommentsDto> {
        return this.commentsService.create(user, comment_id, comment);
    }

    @ApiOperation({ summary: 'Update comment' })
    @ApiResponse({ status: 200, type: CreateCommentsDto })
    @UseGuards(CheckJwtGuard, UserColumnsGuard, CardCommentsGuard)
    @Put(':comment_id')
    async update(@Body() commentDto: CreateCommentsDto, @Param('comment_id') comment_id: string): Promise<CreateCommentsDto> {
        return this.commentsService.update(comment_id, commentDto)
    }

    @ApiOperation({ summary: 'Delete comment by id' })
    @ApiResponse({ status: 200, type: Boolean })
    @UseGuards(CheckJwtGuard, UserColumnsGuard, CardCommentsGuard)
    @Delete(':comment_id')
    async delete(@Param('comment_id') comment_id: string): Promise<boolean> {
        return this.commentsService.delete(comment_id)
    }
}
