import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import { CreatePaymentDto } from 'src/modules/Payment/dto/create-payment.dto';


@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
   
  ) { }

  async createMomo(amounts: CreatePaymentDto) {
    const partnerCode = process.env.MOMO_PARTNER_CODE || 'MOMO';
    const accessKey = process.env.MOMO_ACCESS_KEY || 'F8BBA842ECF85';
    const secretKey = process.env.MOMO_SECRET_KEY || 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

    const timestamp = Date.now();
    const requestId = `${partnerCode}_${amounts.useId}_${timestamp}`;
    const orderId = requestId;
    const orderInfo = 'Nộp tiền vào ví điện tử của bạn';
    const redirectUrl = 'http://localhost:3000/pages/homepage';

  
    const ipnUrl = `http://localhost:8080/payment/handler-payment`;

    const amount = amounts.amounts;
    const requestType = 'captureWallet';

    
    const extraData = Buffer.from(JSON.stringify({ userId: amounts.useId })).toString('base64');

   
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      orderId,
      amount,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: 'en',
    };

    try {
      const response = await firstValueFrom(this.httpService.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody));
      return response.data.payUrl;
    } catch (error) {
      console.error('Lỗi khi tạo giao dịch Momo:', error.response?.data || error.message);
      throw new Error('Không thể tạo giao dịch thanh toán Momo');
    }
  }


}
