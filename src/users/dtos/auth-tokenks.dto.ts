import { IsJWT } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQG1haWwucnUiLCJpYXQiOjE2Mz',
    description: 'Access and refresh jwt'
  })
  @IsJWT({ message: "Must be JWT" })
  readonly accessToken: string
  
//   @IsJWT({ message: "Must be JWT" })
//   readonly refreshToken: string
}