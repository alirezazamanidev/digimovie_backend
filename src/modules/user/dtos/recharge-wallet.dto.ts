import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RechargeWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  price: string;
}
