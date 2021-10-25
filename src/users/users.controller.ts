import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    async getAll(): Promise<User[]> {
        return await this.usersService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':user_id')
    async getUserById(@Param('user_id') id: string): Promise<User> {
        return await this.usersService.getById(id)
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.create(user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':user_id')
    async deleteUser(@Param('user_id') id: string) {
        return await this.usersService.delete(id)
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Put(':user_id')
    async updateUser(@Param('user_id') id: string, @Body() user: CreateUserDto) {
        return await this.usersService.update(id, user)
    }
}
