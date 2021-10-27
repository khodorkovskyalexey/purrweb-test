import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-columns.dto';
import { UserColumnsGuard } from './user-columns.guard';

@Controller('users/:user_id/columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {
    }
    
    @Get()
    async getUsersColumns(@Param('user_id') user_id: string): Promise<CreateColumnDto[]> {
        return this.columnsService.getUsersColumns(user_id)
    }

    @Get(':column_id')
    async getUserColumnById(@Param('column_id') column_id: string) {
        return this.columnsService.getById(column_id)
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() column: CreateColumnDto, @Param('user_id') user_id: string): Promise<CreateColumnDto> {
        return this.columnsService.create(column, user_id)
    }

    @UseGuards(JwtAuthGuard, UserColumnsGuard)
    @Put(':column_id')
    async update(
        @Param('user_id') user_id: string,
        @Param('column_id') column_id: string,
        @Body() column: CreateColumnDto
    ) {
        return this.columnsService.update(column, column_id)
    }

    @UseGuards(JwtAuthGuard, UserColumnsGuard)
    @Delete(':column_id')
    async delete(@Param('user_id') user_id: string, @Param('column_id') column_id: string) {
        return this.columnsService.delete(column_id)
    }
}
