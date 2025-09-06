import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';  
import { StripeModule } from 'src/modules/Payment/spripte.module';
import { Book } from 'src/modules/books/entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/modules/Payment/entity/payment.entity';
@Module({
  imports: [
    HttpModule, 
    StripeModule,
    TypeOrmModule.forFeature([Book,Payment])],  
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
