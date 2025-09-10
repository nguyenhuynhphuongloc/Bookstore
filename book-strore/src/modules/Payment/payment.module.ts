import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';  
import { StripeModule } from 'src/modules/Payment/spripte.module';
import { Book } from 'src/modules/books/entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/modules/Payment/entity/payment.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { CartService } from 'src/modules/cart/cart.service';
import { CartItem } from 'src/modules/cart/entities/cart.items';
@Module({
  imports: [
    HttpModule, 
    StripeModule,
    TypeOrmModule.forFeature([Book,Payment,User,Cart,CartItem])],  
  controllers: [PaymentController],
  providers: [PaymentService,CartService],
})
export class PaymentModule {}
