import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@ObjectType()
@Entity('books')
export class Book {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  isbn13: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  isbn10?: string;

  @Field(() => String)
  @Column({ type: 'text' }) // để tránh bị tràn dữ liệu
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  subtitle?: string;

  @Field(() => String)
  @Column({ type: 'text' }) 
  authors: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  categories?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  thumbnail?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'longtext', nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  published_year?: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  average_rating?: number | null;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  num_pages?: number | null;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  ratings_count?: number | null;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  price?: number | null;

  @ManyToMany(() => Cart, cart => cart.books)
  carts: Cart[];
}
