import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({ example: 'ToDo list', description: 'Name of column' })
  @IsString({ message: "Must be string" })
  readonly name: string;
}