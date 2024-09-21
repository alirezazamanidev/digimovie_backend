import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from '../entities/wallet.entity';
import { DataSource, Repository } from 'typeorm';
import { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({scope:Scope.REQUEST})
export class WalletService {
  constructor(
    @Inject(REQUEST) private readonly request:Request,
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    private readonly dataSourse:DataSource
  ) {}
  async create(userId: number) {
    await this.walletRepository.insert({ userId, amount: '0' });
  }

  async recharge(walletDto:RechargeWalletDto){
    const queryRunner= this.dataSourse.createQueryRunner();
    await queryRunner.connect();
    try {
      let {price}=walletDto;
      let {id:userId}=this.request.user;

       const wallet=queryRunner.manager.findOne(WalletEntity,{where:{userId}});

       // 
    } catch (error) {
      
    }    
  }
}
