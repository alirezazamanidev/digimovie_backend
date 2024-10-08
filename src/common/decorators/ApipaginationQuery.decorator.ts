import { applyDecorators } from "@nestjs/common"
import { ApiQuery } from "@nestjs/swagger"

export const ApiPaginationQuery=()=>{

    return applyDecorators(
        ApiQuery({name:'page',type:Number,required:false}),
        ApiQuery({name:'limit',type:Number,required:false})
    )
}