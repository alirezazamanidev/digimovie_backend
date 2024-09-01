import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsString, Length } from 'class-validator';

export class SendOtpDTo {
  @ApiProperty({
    description: 'Enter phoneNumber :',
    type: String,
    example: '09914275883',
  })
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('fa-IR')
  phone: string;
}
export class CheckOtpDTo {
  @ApiProperty({
    description: 'Enter phoneNumber :',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('fa-IR')
  phone: string;
  @ApiProperty({ description: 'Enter code :' })
  @IsNotEmpty()
  @IsString()
  @Length(5, 5)
  code: string;
}
