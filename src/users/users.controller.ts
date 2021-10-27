import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll()
    }

    @Get(':user_id')
    async findUserById(@Param('user_id') id: string): Promise<User> {
        return await this.usersService.findById(id)
    }

    @Post()
    async register(@Body() user: CreateUserDto): Promise<AuthUsersDto> {
        return this.usersService.create(user)
    }

    @Post('login')
    async login(@Body() user: CreateUserDto): Promise<AuthUsersDto> {
        return this.usersService.login(user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':user_id')
    async deleteUser(@Param('user_id') id: string): Promise<boolean> {
        return await this.usersService.delete(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':user_id')
    async updateUser(@Param('user_id') id: string, @Body() user: CreateUserDto): Promise<CreateUserDto> {
        return await this.usersService.update(id, user)
    }
}
