import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RefreshToken } from 'src/modules/auth/entities/RefreshToken.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';

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
  @Column()
  role: string;

  @Column({ type: 'text', nullable: true })
  hashedRefreshToken: string | null;

  @Field({ nullable: true })  
  @Column({ nullable: true })
  avatarUrl?: string;

  @Field({ nullable: true })  
  @Column({ nullable: true })
  refreshTokens: string;

  @OneToOne(() => Cart, cart => cart.user)
  cart: Cart;
}
