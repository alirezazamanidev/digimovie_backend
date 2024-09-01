import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserOtpEntity } from '../user/entities';
import { Repository } from 'typeorm';
import { AuthMessage, PublicMessage } from 'src/common/enums';
import { CheckOtpDTo, SendOtpDTo } from './dto/auth.dto';
import { randomInt } from 'crypto';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserOtpEntity)
    private userOtpRepository: Repository<UserOtpEntity>,
    private readonly tokenService: TokensService,
  ) {}

  async sendOtp(SendOtpDto: SendOtpDTo) {
    const { phone } = SendOtpDto;

    let user = await this.userRepository.findOneBy({ phone });

    if (!user) {
      user = this.userRepository.create({ phone });
      user = await this.userRepository.save(user);
    }
    const otp = await this.createOtpForUser(user);

    // send sms by kavenegar
    // await this.kavenegarService.sendVerificatrionSms(user.phone, otp.code);
    return {
      message: PublicMessage.SendOtp,
      code: otp.code,
    };
  }
  async checkOtp(checkOtpDto: CheckOtpDTo) {
    const { code, phone } = checkOtpDto;
    const user = await this.userRepository.findOne({
      where: { phone },
      relations: { otp: true },
    });
    if (!user || !user?.otp)
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    const now = new Date();
    const otp = user.otp;
    if (otp.expiresIn < now)
      throw new UnauthorizedException(AuthMessage.ExpiredCode);

    if (otp.code !== code)
      throw new UnauthorizedException(AuthMessage.OtpCodeIsIncorrect);
    const accessToken = this.tokenService.createJWtToken({
      userId: user.id,
    });
    await this.userRepository.update({ id: user.id }, { phone_verify: true });
    return {
      message: PublicMessage.LoggedIn,
      JwtTokenInfo: {
        type: 'bearer',
        filed: 'authorization',
        expiresIn: ' 7 days',
        value: accessToken,
      },
    };
  }
  private async createOtpForUser(user: UserEntity) {
    let otp = await this.userOtpRepository.findOneBy({ userId: user.id });
    const code = randomInt(10000, 99999).toString();
    const expiresIn = new Date(new Date().getTime() + 2 * 1000 * 60);
    let existOtp = false;
    const now = new Date();
    if (otp) {
      if (otp.expiresIn > now)
        throw new UnauthorizedException(AuthMessage.NotExpiredOtp);
      existOtp = true;
      otp.code = code;
      otp.expiresIn = expiresIn;
    } else {
      otp = this.userOtpRepository.create({ code, expiresIn, userId: user.id });
    }
    otp = await this.userOtpRepository.save(otp);
    if (!existOtp) {
      await this.userRepository.update({ id: user.id }, { otpId: otp.id });
    }
    return otp;
  }
}
