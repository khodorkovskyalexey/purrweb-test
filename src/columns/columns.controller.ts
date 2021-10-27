import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { Columns } from './columns.entity';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-columns.dto';
import { UserColumnsGuard } from './user-columns.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Columns module')
@Controller('users/:user_id/columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {
    }

    @ApiOperation({ summary: 'Get all columns by authors id' })
    @ApiResponse({ status: 200, type: [Columns] })
    @Get()
    async findUsersColumns(@Param('user_id') user_id: string): Promise<Columns[]> {
        return this.columnsService.findUsersColumns(user_id)
    }

    @ApiOperation({ summary: 'Get column by id' })
    @ApiResponse({ status: 200, type: Columns })
    @UseGuards(UserColumnsGuard)
    @Get(':column_id')
    async findUserColumnById(@Param('column_id') column_id: string): Promise<Columns> {
        return this.columnsService.findById(column_id)
    }
    
    @ApiOperation({ summary: 'Create new column' })
    @ApiResponse({ status: 200, type: CreateColumnDto })
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() column: CreateColumnDto, @Param('user_id') user_id: string): Promise<CreateColumnDto> {
        return this.columnsService.create(column, user_id)
    }

    @ApiOperation({ summary: 'Update column data' })
    @ApiResponse({ status: 200, type: CreateColumnDto })
    @UseGuards(JwtAuthGuard, UserColumnsGuard)
    @Put(':column_id')
    async update(
        @Param('column_id') column_id: string,
        @Body() column: CreateColumnDto
    ): Promise<CreateColumnDto> {
        return this.columnsService.update(column, column_id)
    }

    @ApiOperation({ summary: 'Delete column by id' })
    @ApiResponse({ status: 200, type: Boolean })
    @UseGuards(JwtAuthGuard, UserColumnsGuard)
    @Delete(':column_id')
    async delete(@Param('column_id') column_id: string): Promise<boolean> {
        return this.columnsService.delete(column_id)
    }
}
