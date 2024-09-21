import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { PaymentType } from "../enums/payment-type.enum";
import { Column } from "typeorm";

export class CreatePaymentDto {
    @IsEnum(PaymentType)
    @IsNotEmpty()
    type:string
    @IsNotEmpty()
    amount:string
    @IsNumber()
    userId:number

}