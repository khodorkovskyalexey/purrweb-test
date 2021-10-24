import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.usersService.getById(id)
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return await this.usersService.create(user)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.delete(id)
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
        return await this.usersService.update(id, user)
    }
}
