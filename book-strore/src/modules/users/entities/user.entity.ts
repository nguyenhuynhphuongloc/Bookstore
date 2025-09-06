import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Payment } from 'src/modules/Payment/entity/payment.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ default: 'user' })
  role: string;

  @Field({ nullable: true })  
  @Column({ nullable: true })
  avatarUrl?: string;

  @Field({ nullable: true })  
  @Column({ nullable: true })
  refreshTokens: string;

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  cart: Cart;

  @OneToMany(() => Payment, payment => payment.user)
  payments: Payment[];
}
