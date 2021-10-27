import { IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { ReturnUserDto } from "./return-user.dto";

export class CreateUserDto extends ReturnUserDto{

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString({ message: "Must be string" })
  @Length(4, 16, { message: "Must be from 4 to 16" })
  password: string

  constructor(model: any = {}) {
    super(model);
    this.password = model.password;
  }
}