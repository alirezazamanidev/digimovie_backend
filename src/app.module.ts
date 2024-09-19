import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './configs';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass:TypeOrmDbConfig,
    inject:[TypeOrmModule]
  }), UserModule, AuthModule, CategoryModule],
  providers:[TypeOrmDbConfig]
})
export class AppModule {}
