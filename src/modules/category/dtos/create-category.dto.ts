import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(3,20)
    title:string
    @ApiPropertyOptional()
    slug:string
    @ApiPropertyOptional()
    description:string
}