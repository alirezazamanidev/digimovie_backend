import './env.config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class TypeOrmDbConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      port: +process.env.DB_PORT,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      entities: ['dist/modules/**/*.entity.js'],
      migrations: ['dist/database/migrations/*.{ts,js}'],
      synchronize: true,
    };
  }
}
