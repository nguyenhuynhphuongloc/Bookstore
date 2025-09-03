import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';  
import { StripeModule } from 'src/modules/Payment/spripte.module';
@Module({
  imports: [HttpModule, StripeModule],  
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
