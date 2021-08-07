import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';

dotenv.config();

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  port: +process.env.POSTGRES_PORT,
  //url: process.env.POSTGRES_URL,
  autoLoadEntities: true,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
