import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { AuthTokensDto } from './dtos/auth-tokenks.dto';
import { AuthUsersDto } from './dtos/auth-user.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    generateResponse(user: User): AuthUsersDto {
        const createdUser = new CreateUserDto(user);
        
        const tokens: AuthTokensDto = this.generateToken(user);
        return new AuthUsersDto(createdUser, tokens);
    }

    private generateToken(user: User): AuthTokensDto {
        const payload = { id: user.id,  email: user.email }
        return {
            accessToken: this.jwtService.sign(payload)
            // refreshToken: this.jwtService.sign(payload)
        }
    }
}
