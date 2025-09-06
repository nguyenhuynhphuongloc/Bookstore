import { Controller, Post, Body, Inject, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from 'src/modules/Payment/dto/create-payment.dto';
import Stripe from 'stripe';
import path from 'path';
import { Repository } from 'typeorm';
import { Book } from 'src/modules/books/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Controller('payment')
export class PaymentController {


  constructor(
    private readonly paymentService: PaymentService,
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe,
    @InjectRepository(Book) readonly bookRepository: Repository<Book>,
  ) { }

  @Post('products')
  async createProduct(
    @Body() body: {
      name: string;
      description: string;
      price: number;
      currency?: string;
      interval?: 'day' | 'week' | 'month' | 'year';
      image?: string;
      metadata?: Record<string, string>;
    },
  ) {
    const {
      name,
      description,
      price,
      currency = 'usd',
      interval = 'month',
      image,
      metadata,
    } = body;

    const product = await this.stripe.products.create({
      name,
      description,
      active: true,
      images: image ? [image] : [],
      metadata: {
        category: 'subscription',
        ...metadata,
      },
      default_price_data: {
        currency,
        unit_amount: price,
        recurring: { interval },
      },
    });

    return {
      message: 'Product created successfully',
      product,
    };
  }


  @Post('handler-payment')
  async handleMomoCallback(@Body() body: any) {

    const extraData = JSON.parse(Buffer.from(body.extraData, 'base64').toString());

    const userId = extraData.userId;

    const amount = body.amount;


    return 1
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
    return await this.paymentService.createPaymentLink(body.orderId,body.items);
  }

  @Post('update')
  async updateStripeIdsForAllBooks() {
  const books = await this.bookRepository.find(); 

  for (const book of books) {
    try {
      const stripeProduct = await this.paymentService.getProductByTitle(book.title);

      if (stripeProduct?.id) {
        book.id_stripe = stripeProduct.id;
        await this.bookRepository.save(book);
        console.log(`✅ Updated book "${book.title}" with Stripe ID: ${stripeProduct.id}`);
      } else {
        console.log(`⚠️ No Stripe product found for "${book.title}"`);
      }

    } catch (err) {
      console.error(`❌ Error updating "${book.title}":`, err.message);
    }
  }

  return { message: 'Stripe IDs updated for all books' };
}

  @Get('get-product-stripe')
  async GetProdcutSpipe(@Body() body: {title: string}) {
      return await this.paymentService.getProductByTitle(body.title)
  }

  @Get('products/import')
  async importProducts() {
   const filePath = "C:/Users/ASUS/Documents/GitHub/Bookstore/book-strore/src/modules/books/books-3.csv";
    return await this.paymentService.importProductsFromFile(filePath);
  }

  
}
