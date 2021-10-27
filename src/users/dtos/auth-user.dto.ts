import { AuthTokensDto } from "./auth-tokenks.dto";
import { ApiProperty } from '@nestjs/swagger';
import { ReturnUserDto } from "./return-user.dto";

export class AuthUsersDto extends ReturnUserDto {
    @ApiProperty({ description: 'Access and refresh jwt', type: AuthTokensDto })
    tokens: AuthTokensDto;

    constructor(user: ReturnUserDto, tokens: AuthTokensDto) {
        super(user)
        this.tokens = tokens
    }
}