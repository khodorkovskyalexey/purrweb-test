import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { Columns } from './columns.entity';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-columns.dto';
import { UserColumnsGuard } from './user-columns.guard';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger'

@ApiTags('Columns module')
@Controller('users/:user_id/columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {
    }

    @ApiParam({ name: 'user_id', description: 'Id columns owner', example: '1' })
    @ApiOperation({ summary: 'Get all columns by authors id' })
    @ApiResponse({ status: 200, type: [Columns] })
    @Get()
    async findUsersColumns(@Param('user_id') user_id: string): Promise<Columns[]> {
        return this.columnsService.findUsersColumns(user_id)
    }

    @ApiParam({ name: 'user_id', description: 'Id column owner', example: '1' })
    @ApiParam({ name: 'column_id', description: 'Finding column id', example: '1' })
    @ApiOperation({ summary: 'Get column by id' })
    @ApiResponse({ status: 200, type: Columns })
    @UseGuards(UserColumnsGuard)
    @Get(':column_id')
    async findUserColumnById(@Param('column_id') column_id: string): Promise<Columns> {
        return this.columnsService.findById(column_id)
    }
    
    @ApiParam({ name: 'user_id', description: 'Id user who creating column', example: '1' })
    @ApiOperation({ summary: 'Create new column' })
    @ApiResponse({ status: 200, type: CreateColumnDto })
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() column: CreateColumnDto, @Param('user_id') user_id: string): Promise<CreateColumnDto> {
        return this.columnsService.create(column, user_id)
    }

    @ApiParam({ name: 'user_id', description: 'Id user who update column', example: '1' })
    @ApiParam({ name: 'column_id', description: 'Updating column id', example: '1' })
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

    @ApiParam({ name: 'user_id', description: 'Id user who delete column', example: '1' })
    @ApiParam({ name: 'column_id', description: 'Deleting column id', example: '1' })
    @ApiOperation({ summary: 'Delete column by id' })
    @ApiResponse({ status: 200, type: Boolean })
    @UseGuards(JwtAuthGuard, UserColumnsGuard)
    @Delete(':column_id')
    async delete(@Param('column_id') column_id: string): Promise<boolean> {
        return this.columnsService.delete(column_id)
    }
}
