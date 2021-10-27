import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { AuthUsersDto } from './dtos/auth-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Users } from './user.entity';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger'
import { ReturnUserDto } from './dtos/return-user.dto';

@ApiTags('Users module')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [Users] })
    @Get()
    async findAll(): Promise<Users[]> {
        return await this.usersService.findAll({
            relations: ["columns", "columns.cards", "comments"]
        })
    }

    @ApiParam({ name: 'user_id', description: 'Finding user id', example: '1' })
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, type: Users })
    @Get(':user_id')
    async findUserById(@Param('user_id') id: string): Promise<Users> {
        return await this.usersService.findById(id)
    }

    @ApiOperation({ summary: 'Register' })
    @ApiResponse({ status: 200, type: AuthUsersDto })
    @Post()
    async register(@Body() user: CreateUserDto): Promise<AuthUsersDto> {
        return this.usersService.create(user)
    }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, type: AuthUsersDto })
    @Post('login')
    async login(@Body() user: CreateUserDto): Promise<AuthUsersDto> {
        return this.usersService.login(user)
    }

    @ApiParam({ name: 'user_id', description: 'Deleting user id', example: '1' })
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiResponse({ status: 200, type: Boolean })
    @UseGuards(JwtAuthGuard)
    @Delete(':user_id')
    async deleteUser(@Param('user_id') id: string): Promise<boolean> {
        return await this.usersService.delete(id)
    }

    @ApiParam({ name: 'user_id', description: 'Updating user id', example: '1' })
    @ApiOperation({ summary: 'Update user data' })
    @ApiResponse({ status: 200, type: ReturnUserDto })
    @UseGuards(JwtAuthGuard)
    @Put(':user_id')
    async updateUser(@Param('user_id') id: string, @Body() user: CreateUserDto): Promise<ReturnUserDto> {
        return await this.usersService.update(id, user)
    }
}
