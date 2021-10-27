import { IsString } from "class-validator"

export class CreateColumnDto {
  @IsString({ message: "Must be string" })
  readonly name: string;
}