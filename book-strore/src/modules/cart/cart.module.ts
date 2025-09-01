import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/modules/cart/entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
  ],
  providers: [CartResolver, CartService],
})
export class CartModule {}
