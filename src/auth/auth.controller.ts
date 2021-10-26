import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { AuthTokensDto } from './dto/auth_tokens.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post('login')
    async login(@Body() userDto: CreateUserDto): Promise<AuthTokensDto> {
        return this.authService.login(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('register')
    async register(@Body() userDto: CreateUserDto): Promise<AuthTokensDto> {
        return this.authService.register(userDto)
    }
}
