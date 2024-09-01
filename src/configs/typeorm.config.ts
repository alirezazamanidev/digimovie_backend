import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class TypeOrmDbConfig implements TypeOrmOptionsFactory {

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      port:process.env.DB_PORT,
      host:process.env.DB_HOST,
      password:process.env.DB_PASSWORD,
      username:process.env.DB_USERNAME,
      entities: ['dist/modules/**/*.entity.js'],
      synchronize:false,
      migrations:['dist/migrations/*.{ts,js}'],
    

    };
  }
}
