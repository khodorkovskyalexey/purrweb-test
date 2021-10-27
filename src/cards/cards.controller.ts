import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserColumnsGuard } from 'src/columns/user-columns.guard';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { Cards } from './cards.entity';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('users/:user_id/columns/:column_id/cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @UseGuards(JwtAuthGuard, UserColumnsGuard)
    @Post()
    async create(@Body() card: CreateCardDto, @Param('column_id') column_id: string): Promise<CreateCardDto> {
        return this.cardsService.create(card, column_id)
    }

    @Get()
    async findAllCardsInColumn(@Param('column_id') column_id: string): Promise<Cards[]> {
        return this.cardsService.findAll(column_id)
    }

    // ДОБАВИТЬ ПРОВЕРКУ ВХОДИТ ЛИ КАРТА В ДАННУЮ КОЛОНКУ
    @Get(':card_id')
    async findOneCardInColumn(@Param('card_id') card_id: string) {
        return this.cardsService.findById(card_id)
    }

    @Delete(':card_id')
    async delete(@Param('card_id') card_id: string): Promise<boolean> {
        return this.cardsService.delete(card_id)
    }

    @Put(':card_id')
    async update(
        @Param('card_id') card_id: string,
        @Body() card: CreateCardDto
    ): Promise<CreateCardDto> {
        return this.cardsService.update(card_id, card)
    }
}
