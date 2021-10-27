import { IsString, Length } from "class-validator";
import { Users } from "src/users/user.entity";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentsDto {
    @ApiProperty({ example: 'Good idea!', description: 'Comments text' })
    @IsString({ message: "Must be string" })
    @Length(1, 256, { message: "Must be from 1 to 256" })
    readonly text: string;

    @ApiProperty({ description: 'Author of comment', type: Users })
    readonly author: Users;
}