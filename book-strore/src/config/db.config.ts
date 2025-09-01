import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Book } from 'src/modules/books/entities/book.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { User } from 'src/modules/users/entities/user.entity';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Cart, Book],
  autoLoadEntities: true,
  synchronize: true,
};
