import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivationCodeEntity, UserEntity } from './entities';
import { MoreThan, Repository } from 'typeorm';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { NotFoundMessage } from 'src/common/enums';
import { MailService } from '../mail/mail.service';
import { randomBytes, randomInt } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ActivationCodeEntity)
    private activtionCodeRepository: Repository<ActivationCodeEntity>,
    private readonly mailService: MailService,
  ) {}

  async verifyEmail(verifyEmaidto: VerifyEmailDto) {
    let { email } = verifyEmaidto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException(NotFoundMessage.User);
    if (user.email_verify)
      throw new BadRequestException('ایمیل مورد نظر تایید شده است!');

    const activeCode=await this.createActiveCodeForUser(user.id);
    await this.mailService.sendCodeForEmail(email,user.username,activeCode);

    return {
      message: 'کد تایید با موفقیت به ایمیل شما ارسال شد!',
    };
  }

  async createActiveCodeForUser(userId: number) {
    const activeCodeList = await this.activtionCodeRepository.find({
      where: {
        expiresIn: MoreThan(new Date()),
      },
    });
    
    if (activeCodeList.length>0)
      throw new UnauthorizedException(
        'لینک فعاب سازی ایمیل هنوز منقضی نشده است!',
      );
    const newActivecode = this.activtionCodeRepository.create({
      code: randomBytes(8).toString('hex'),
      expiresIn: new Date(new Date().getTime()+ 5 * 1000 * 60),
      userId,
      used: false,
    });
  
    const savedActiveUser=await this.activtionCodeRepository.save(newActivecode);
    return savedActiveUser.code;
  }
}
