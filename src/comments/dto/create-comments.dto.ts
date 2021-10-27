import { IsDateString, IsString, Length } from "class-validator"
import { Users } from "src/users/user.entity";

export class CreateCommentsDto {
    @IsString({ message: "Must be string" })
    @Length(1, 256, { message: "Must be from 1 to 256" })
    readonly text: string;

    readonly author: Users;
}