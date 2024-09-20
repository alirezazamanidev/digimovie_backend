import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserOtpEntity } from '../user/entities';
import { Repository } from 'typeorm';
import {
  AuthMessage,
  ConflictMessage,
  NotFoundMessage,
  PublicMessage,
} from 'src/common/enums';

import { randomInt } from 'crypto';
import { TokensService } from './tokens.service';
import { SignInDTo, SignUpDto } from './dto/auth.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { isEmail } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserOtpEntity)
    private userOtpRepository: Repository<UserOtpEntity>,
    private readonly tokenService: TokensService,
  ) {}

  async signUp(userDto: SignUpDto) {
    let { username, password, email, phone } = userDto;
    // check exist user by username
    await this.checkExitAccount(phone, email, username);
    await this.checkExistByUsername(username);
    // hash bassword
    const salt = genSaltSync(16);
    const hash = hashSync(password, salt);
    // create new user
    const newUser = this.userRepository.create({
      username,
      hashedPassword: hash,
      phone,
      email,
      email_verify: false,
      phone_verify: false,
    });
    const savedUser = await this.userRepository.save(newUser);
    // create token
    const token = this.tokenService.createJWtToken({ userId: savedUser.id });
    return {
      message: PublicMessage.SignUp,
      token,
    };
  }
  async signIn(userDto: SignInDTo) {
    let { username, password } = userDto;
    // validate username
    let user = null;
    if (isEmail(username)) {
      user = await this.userRepository.findOneBy({ email: username });
    } else {
      user = await this.userRepository.findOneBy({ username });
    }
    if (!user) throw new UnauthorizedException(AuthMessage.NotFoundAccount);
    // check hashed password
    if (!compareSync(password, user.hashedPassword))
      throw new UnauthorizedException(AuthMessage.NotFoundAccount);
    // create token
    const token = this.tokenService.createJWtToken({ userId: user.id });
    return {
      message: PublicMessage.LoggedIn,
      token,
    };
  }

  async checkExistByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) throw new ConflictException(ConflictMessage.Username);
  }
  async checkExitAccount(phone: string, email: string, username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
        phone,
        email,
      },
    });
    if (user) throw new ConflictException(ConflictMessage.Account);
  }
}
