import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationCodeEntity, UserEntity } from './entities';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailModule } from '../mail/mail.module';

@Module({
    imports:[TypeOrmModule.forFeature([ActivationCodeEntity,UserEntity]),MailModule],
    exports:[TypeOrmModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
