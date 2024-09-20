import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './configs';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { MovieModule } from './modules/movie/movie.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass:TypeOrmDbConfig,
    inject:[TypeOrmModule]
  }), AuthModule,UserModule, CategoryModule, MovieModule, MailModule],
  providers:[TypeOrmDbConfig]
})
export class AppModule {}
