import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnsService } from 'src/columns/columns.service';
import { Repository } from 'typeorm';
import { Cards } from './cards.entity';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Cards) private cardsRepository: Repository<Cards>,
        private columnsService: ColumnsService
    ) {}

    async create(cardDto: CreateCardDto, column_id: string): Promise<CreateCardDto> {
        const column = await this.columnsService.findById(column_id);
        const card = await this.cardsRepository.create({ ...cardDto, column });
        await this.cardsRepository.save(card);
        return card;
    }

    async findAll(column_id: string): Promise<Cards[]> {
        return await this.cardsRepository.find({ where: {
            column : {
                id: column_id
            }
        } });
    }

    async findById(card_id: string, options = {}): Promise<Cards> {
        return await this.cardsRepository.findOne(card_id, options);
    }

    async update(card_id: string, cardDto: CreateCardDto): Promise<CreateCardDto> {
        await this.cardsRepository.update(card_id, cardDto)
        return cardDto
    }

    async delete(card_id: string): Promise<boolean> {
        await this.cardsRepository.delete(card_id)
        return true
    }
}
