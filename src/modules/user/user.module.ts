import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationCodeEntity, UserEntity } from './entities';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { MailModule } from '../mail/mail.module';
import { WalletController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { WalletEntity } from './entities/wallet.entity';

@Module({
    imports:[TypeOrmModule.forFeature([ActivationCodeEntity,UserEntity,WalletEntity]),MailModule],
    providers: [UserService,WalletService],
    controllers: [UserController,WalletController],
    exports:[TypeOrmModule,WalletService],
})
export class UserModule {}
