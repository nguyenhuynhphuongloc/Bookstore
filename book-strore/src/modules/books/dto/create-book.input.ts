import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateBookInput {
  @Field(() => String)
  isbn13: string;

  @Field(() => String, { nullable: true })
  isbn10?: string;

  @Field(() => String)
  @Column({ type: 'text' }) // cho phép > 255 ký tự
  title: string;

  @Field(() => String, { nullable: true })
  subtitle?: string;

  @Field(() => String)
  authors: string;

  @Field(() => String, { nullable: true })
  categories?: string;

  @Field(() => String, { nullable: true })
  thumbnail?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  published_year?: number;

  @Field(() => Float, { nullable: true })
  average_rating?: number;

  @Field(() => Int, { nullable: true })
  num_pages?: number;

  @Field(() => Int, { nullable: true })
  ratings_count?: number;

  @Field(() => Float, { nullable: true })
  price?: number;
}
