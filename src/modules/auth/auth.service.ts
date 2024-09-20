import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserOtpEntity } from '../user/entities';
import { Repository } from 'typeorm';
import { AuthMessage, ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/enums';

import { randomInt } from 'crypto';
import { TokensService } from './tokens.service';
import { SignUpDto } from './dto/auth.dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserOtpEntity)
    private userOtpRepository: Repository<UserOtpEntity>,
    private readonly tokenService: TokensService,
  ) {}


  async signUp(userDto:SignUpDto){
    let {username,password,email,phone}=userDto;
    // check exist user by username
    await this.checkExitAccount(phone,email,username);
    await this.checkExistByUsername(username);
    // hash bassword 
    const salt=genSaltSync(16);
    const hash=hashSync(password,salt);
    // create new user
    const newUser=this.userRepository.create({
      username,
      hashedPassword:hash,
      phone,
      email,
      email_verify:false,
      phone_verify:false,
    });
    const savedUser=await this.userRepository.save(newUser);
    // create token
    const token=this.tokenService.createJWtToken({userId:savedUser.id});
    return {
      message:PublicMessage.SignUp,
      token
    }


  }

  async checkExistByUsername(username:string){

    const user=await this.userRepository.findOne({where:{username}});
    if(user) throw new ConflictException(ConflictMessage.Username);
    
  }
  async checkExitAccount(phone:string,email:string,username:string){
    const user=await this.userRepository.findOne({
      where:{
        username,
        phone,
        email
      }
    });
    if(user) throw new ConflictException(ConflictMessage.Account);
    

  }
}
