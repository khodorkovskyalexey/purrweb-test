import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthException } from 'src/exceptions/auth.exception';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.entity';
import { AuthTokensDto } from './dto/auth_tokens.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
        ) {}

    async login(userDto: CreateUserDto): Promise<AuthTokensDto> {
        const user = await this.validateUser(userDto)
        return this.generateToken(user) 
    }

    async register(userDto: CreateUserDto): Promise<AuthTokensDto> {
        const candidate = await this.userService.findByEmail(userDto.email)
        if(candidate) {
            throw AuthException.BadRequest(`User with email: ${userDto.email} already exists`)
        }

        const hash_password = await bcrypt.hash(userDto.password, 10)
        const user: User = await this.userService.create({...userDto, password: hash_password})
        return this.generateToken(user)
    }

    private async validateUser(userDto: CreateUserDto): Promise<User> {
        const user = await this.userService.findByEmail(userDto.email)
        const isPasswordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && isPasswordEquals) {
            return user
        }
        throw AuthException.UnauthorizedError()
    }

    private generateToken(user: User): AuthTokensDto {
        const payload = { id: user.id,  email: user.email }
        return {
            accessToken: this.jwtService.sign(payload)
            // refreshToken: this.jwtService.sign(payload)
        }
    }
}
