import { AuthTokensDto } from "./auth-tokenks.dto";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from '@nestjs/swagger';

export class AuthUsersDto extends CreateUserDto {
    @ApiProperty({ description: 'Access and refresh jwt', type: AuthTokensDto })
    tokens: AuthTokensDto;

    constructor(user: CreateUserDto, tokens: AuthTokensDto) {
        super(user)
        this.tokens = tokens
    }
}