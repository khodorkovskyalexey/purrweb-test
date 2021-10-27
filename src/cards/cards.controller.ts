import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserColumnsGuard } from 'src/columns/user-columns.guard';
import { CheckJwtGuard } from 'src/users/check-jwt.guatd';
import { Cards } from './cards.entity';
import { CardsService } from './cards.service';
import { ColumnCardsGuard } from './column-cards.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Cards module')
@Controller('columns/:column_id/cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @ApiOperation({ summary: 'Create new card in column' })
    @ApiResponse({ status: 200, type: CreateCardDto })
    @UseGuards(CheckJwtGuard, UserColumnsGuard)
    @Post()
    async create(@Body() card: CreateCardDto, @Param('column_id') column_id: string): Promise<CreateCardDto> {
        return this.cardsService.create(card, column_id)
    }

    @ApiOperation({ summary: 'Get all cards by columns id' })
    @ApiResponse({ status: 200, type: [Cards] })
    @Get()
    async findAllCardsInColumn(@Param('column_id') column_id: string): Promise<Cards[]> {
        return this.cardsService.findAll(column_id)
    }

    @ApiOperation({ summary: 'Get one card by id' })
    @ApiResponse({ status: 200, type: Cards })
    @UseGuards(ColumnCardsGuard)
    @Get(':card_id')
    async findOneCardInColumn(@Param('card_id') card_id: string): Promise<Cards> {
        return this.cardsService.findById(card_id)
    }

    @ApiOperation({ summary: 'Delete card by id' })
    @ApiResponse({ status: 200, type: Boolean })
    @UseGuards(CheckJwtGuard, UserColumnsGuard)
    @Delete(':card_id')
    async delete(@Param('card_id') card_id: string): Promise<boolean> {
        return this.cardsService.delete(card_id)
    }

    @ApiOperation({ summary: 'Update card data' })
    @ApiResponse({ status: 200, type: CreateCardDto })
    @UseGuards(CheckJwtGuard, UserColumnsGuard)
    @Put(':card_id')
    async update(
        @Param('card_id') card_id: string,
        @Body() card: CreateCardDto
    ): Promise<CreateCardDto> {
        return this.cardsService.update(card_id, card)
    }
}
