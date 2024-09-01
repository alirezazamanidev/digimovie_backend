import './../config/env.config';
import { DataSource } from "typeorm";

let dataSource=new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/modules/**/*.entity.js'],
    synchronize:false ,
    migrations:['dist/database/migrations/*.{ts,js}'],
    migrationsTableName:'dijikala_migration_db'
})
export default dataSource;
