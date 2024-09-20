import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import exp from "constants";

export class VerifyEmailDto {
    @ApiProperty()
    @IsEmail()
    email:string
}