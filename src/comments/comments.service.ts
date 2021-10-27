import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsService } from 'src/cards/cards.service';
import { Users } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { CreateCommentsDto } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments) private commentsRepository: Repository<Comments>,
        private cardsService: CardsService
    ) {}

    async findAll(card_id: string): Promise<Comments[]> {
        return await this.commentsRepository.find({ where: {
            card: {
                id: card_id
            }
        } });
    }

    async findById(comment_id: string, options = {}): Promise<Comments> {
        return await this.commentsRepository.findOne(comment_id, options)
    }

    async create(author: Users, card_id: string, commentDto: CreateCommentsDto): Promise<CreateCommentsDto> {
        const card = await this.cardsService.findById(card_id);
        const comment = await this.commentsRepository.create({ ...commentDto, card, author });
        await this.commentsRepository.save(comment);
        return comment;
    }

    async update(comment_id: string, commentDto: CreateCommentsDto): Promise<CreateCommentsDto> {
        await this.commentsRepository.update(comment_id, commentDto)
        return commentDto
    }

    async delete(comment_id: string): Promise<boolean> {
        await this.commentsRepository.delete(comment_id)
        return true
    }
}
