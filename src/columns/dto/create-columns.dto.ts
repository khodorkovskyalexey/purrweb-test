import { IsString } from "class-validator"

export class CreateColumnDto {
  @IsString()
  readonly name: string;
}