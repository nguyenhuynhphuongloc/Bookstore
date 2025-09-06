import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import path from 'path';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('STRIPE_CLIENT') private readonly stripe: Stripe

  ) { }

  async importProductsFromFile(filePath: string) {
    const results: any[] = [];

    return new Promise((resolve, reject) => {

      fs.createReadStream(filePath)
        .pipe(csv({ mapHeaders: ({ header }) => header.toLowerCase().trim() }))
        .on('data', (row) => results.push(row))
        .on('end', async () => {
          const createdProducts: Stripe.Response<Stripe.Product>[] = [];

          for (const row of results) {
            console.log("Row from CSV:", row);
            const product = await this.stripe.products.create({
              name: row.title,
              active: true,
              images: row.thumbnail ? [row.thumbnail] : [],
              default_price_data: {
                currency: 'usd',
                unit_amount: Number(row.price) * 100,
              },
            });

            createdProducts.push(product);
          }

          resolve({
            message: 'Products imported successfully',
            count: createdProducts.length,
            products: createdProducts,
          });
        })
        .on('error', (err) => reject(err));
    });
  }

async getProductByTitle(title: string) {
  const cleanTitle = title.trim();

  const products = await this.stripe.products.search({
    query: `name:"${cleanTitle}"`  // exact match
  });

  console.log("✅ Stripe returned:", products.data);

  if (products.data.length === 0) {
    return { message: 'No product found' };
  }

  return {
    id: products.data[0].id
  };
}

  async createPaymentLink(cardId: string, items: { productId: string; quantity: number }[]) {

    const lineItems: Stripe.PaymentLinkCreateParams.LineItem[] = [];

    for (const item of items) {
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
        card_id: cardId,
      },
    });

    return { url: paymentLink.url };
  }


}
