import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ReturnUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  @IsString({ message: "Must be string" })
  @IsEmail({}, { message: "Must be email" })
  readonly email: string

  constructor(model: any = {}) {
    this.email = model.email
  }
}