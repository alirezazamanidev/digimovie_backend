import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Injectable()
export class PaymentService {


    constructor(@InjectRepository(PaymentEntity) private readonly paymentRepository:Repository<PaymentEntity>){}

    async create(paymentDto:CreatePaymentDto){
        let {amount,type,userId}=paymentDto;

        // gateway zarinpal
        // create payment
        let payment=this.paymentRepository.create({
            amount:amount,
            authority:'12345',
            invoice_number:new Date().toISOString().toString(),
            userId,
            status:false,
            type,
        });

        payment=await this.paymentRepository.save(payment);

    }

}
