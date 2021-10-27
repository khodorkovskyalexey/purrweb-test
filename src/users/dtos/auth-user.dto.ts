import { AuthTokensDto } from "./auth-tokenks.dto"
import { CreateUserDto } from "./create-user.dto"

export class AuthUsersDto extends CreateUserDto {
    tokens: AuthTokensDto;

    constructor(user: CreateUserDto, tokens: AuthTokensDto) {
        super(user)
        this.tokens = tokens
    }
}