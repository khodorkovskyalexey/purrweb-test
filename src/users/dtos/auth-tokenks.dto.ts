import { IsJWT } from "class-validator"

export class AuthTokensDto {
  @IsJWT({ message: "Must be JWT" })
  readonly accessToken: string
  
//   @IsJWT({ message: "Must be JWT" })
//   readonly refreshToken: string
}