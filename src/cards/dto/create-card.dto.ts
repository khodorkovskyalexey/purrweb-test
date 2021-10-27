import { IsString, Length } from "class-validator"

export class CreateCardDto {
  @IsString({ message: "Must be string" })
  @Length(4, 32, { message: "Must be from 4 to 32" })
  readonly title: string;

  @IsString({ message: "Must be string" })
  @Length(8, 256, { message: "Must be from 8 to 256" })
  readonly description: string;
}