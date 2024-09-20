import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty({type:String})
  @IsNotEmpty()
  @Length(5, 20)
  username: string;
  @ApiProperty()
  @Length(8, 20)
  password: string;
  @ApiProperty()
  @IsEmail()
  email:string
  @ApiProperty()
  @IsMobilePhone('fa-IR')
  phone:string

}
export class SignInDTo {
  @ApiProperty({description:'Enter username or email',type:String,required:true})
  @IsNotEmpty()
  @IsString()
  username:string
  @ApiProperty()
  @Length(8,20)
  @IsString()
  password:string
}