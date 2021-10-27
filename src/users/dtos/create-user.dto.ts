import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  @IsString({ message: "Must be string" })
  @IsEmail({}, { message: "Must be email" })
  readonly email: string

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString({ message: "Must be string" })
  @Length(4, 16, { message: "Must be from 4 to 16" })
  password: string

  constructor(model: any = {}) {
    this.email = model.email
    this.password = model.password
  }
}