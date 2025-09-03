import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from 'src/modules/Payment/dto/create-payment.dto';
import Stripe from 'stripe';
@Controller('payment')
export class PaymentController {


  constructor(
    private readonly paymentService: PaymentService,
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe

  ) { }

  @Post('create-momo')
  async create(@Body() amounts: CreatePaymentDto) {

    return await this.paymentService.createMomo(amounts);

  }

  @Post('handler-payment')
  async handleMomoCallback(@Body() body: any) {
    const extraData = JSON.parse(Buffer.from(body.extraData, 'base64').toString());
    const userId = extraData.userId;
    const amount = body.amount;
   
    return 1
  }


  @Get('payments')
  async createProduct() {
    const product = await this.stripe.products.create({
      name: 'Gold Plan',         
      description: 'Access to premium content and features', 
      active: true,                     
      metadata: {
        internalId: '12345',
        category: 'subscription',
      },
      images: [
        'https://yourdomain.com/assets/gold-plan.png',
      ],
      default_price_data: {
        currency: 'usd',
        unit_amount: 9900, 
        recurring: {
          interval: 'month', 
        },
      },
    });
    return product;
  }

  @Post('create-customer')
  async createCustomer(@Body() body: { email: string; name?: string }) {
    return this.stripe.customers.create({
      email: body.email,
      name: body.name,
    });
  }

  @Post('create-connected-account')
  async createConnectedAccount(@Body() body: { email: string }) {
    const account = await this.stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: body.email,
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
      business_type: 'individual', 
    });

    return account;
  }

  @Post('create-payment-link')
  async createPaymentLink(
    @Body() body: {
      orderId: string;
      items: { productId: string; quantity: number }[];
    }
  ) {
    const lineItems: Stripe.PaymentLinkCreateParams.LineItem[] = [];

    for (const item of body.items) {
      const product = await this.stripe.products.retrieve(item.productId);

      if (!product.default_price) {
        throw new Error(`Product ${item.productId} has no default price`);
      }

      lineItems.push({
        price: typeof product.default_price === 'string'
          ? product.default_price
          : product.default_price.id,
        quantity: item.quantity,
      });
    }

    const paymentLink = await this.stripe.paymentLinks.create({
      line_items: lineItems,
      metadata: {
        order_id: body.orderId, 
      },
    });

    return { url: paymentLink.url };
  }
}
