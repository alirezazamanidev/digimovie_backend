import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserOtpEntity } from './entities';

@Module({
    imports:[TypeOrmModule.forFeature([UserOtpEntity,UserEntity])],
    exports:[TypeOrmModule]
})
export class UserModule {}
