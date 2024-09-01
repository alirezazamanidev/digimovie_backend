import { ApiPropertyOptional } from "@nestjs/swagger";



export class paginaionQueryDto {
    @ApiPropertyOptional({type:Number})
    page:number
    @ApiPropertyOptional({type:Number})
    limit:number
}