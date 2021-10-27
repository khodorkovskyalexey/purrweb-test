import { IsJWT } from "class-validator"

export class AuthTokensDto {
  @IsJWT()
  readonly accessToken: string
  
//   @IsJWT()
//   readonly refreshToken: string
}