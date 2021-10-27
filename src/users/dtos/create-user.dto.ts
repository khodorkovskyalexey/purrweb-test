import { IsEmail, IsString, Length } from "class-validator"
import { User } from "../user.entity"

export class CreateUserDto {
  @IsString({ message: "Must be string" })
  @IsEmail({}, { message: "Must be email" })
  readonly email: string

  @IsString({ message: "Must be string" })
  @Length(4, 16, { message: "Must be from 4 to 16" })
  password: string

  constructor(model: any = {}) {
    this.email = model.email
    this.password = model.password
  }
}