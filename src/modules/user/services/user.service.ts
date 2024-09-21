import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivationCodeEntity, UserEntity } from '../entities';
import { MoreThan, Repository } from 'typeorm';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { BadRequestMessage, NotFoundMessage } from 'src/common/enums';
import { MailService } from '../../mail/mail.service';
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

    const activeCode = await this.createActiveCodeForUser(user.id);
    await this.mailService.sendCodeForEmail(email, user.username, activeCode);

    return {
      message: ' لینک فعال سازی با موفقیت به ایمیل شما ارسال شد!',
    };
  }
  async checkverifyToken(token: string) {
    console.log(token);
    
    const activationCode = await this.activtionCodeRepository.findOne({
      where: { code: token },
      relations: { user: true },
    });
    console.log(activationCode);
    
    if (!activationCode)
      throw new NotFoundException(NotFoundMessage.ActiveCode);
    if (activationCode.expiresIn < new Date())
      throw new BadRequestException(BadRequestMessage.ActiveCodeExpired);
    if (activationCode.used)
      throw new BadRequestException(BadRequestMessage.AlreadyUsedActiveCode);
    let user = activationCode.user;
    user.email_verify = true;
    activationCode.used = true;
    await this.userRepository.save(user);
    await this.activtionCodeRepository.save(activationCode);

    return 'front url';
  }

  async createActiveCodeForUser(userId: number) {
    const activeCodeList = await this.activtionCodeRepository.find({
      where: {
        expiresIn: MoreThan(new Date()),
      },
    });

    if (activeCodeList.length > 0)
      throw new UnauthorizedException(
        'لینک فعال سازی ایمیل هنوز منقضی نشده است!',
      );
    const newActivecode = this.activtionCodeRepository.create({
      code: randomBytes(8).toString('hex'),
      expiresIn: new Date(new Date().getTime() + 5 * 1000 * 60),
      userId,
      used: false,
    });

    const savedActiveUser =
      await this.activtionCodeRepository.save(newActivecode);
    return savedActiveUser.code;
  }
}
