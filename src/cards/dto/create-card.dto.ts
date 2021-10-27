import { IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'Do homework', description: 'Title of card' })
  @IsString({ message: "Must be string" })
  @Length(4, 32, { message: "Must be from 4 to 32" })
  readonly title: string;

  @ApiProperty({ example: 'You should do your math homework', description: 'Description of card', required: false })
  readonly description?: string;
}