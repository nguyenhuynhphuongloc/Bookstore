import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { CartItem } from 'src/modules/cart/entities/cart.items';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) { }

  @Mutation(() => Cart)
  async createCart(
    @Args('createCartInput') createCartInput: string,
  ): Promise<Cart> {
    return await this.cartService.createCart(createCartInput);
  }

  @Query(() => Cart)
  async getCartByUser(
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<Cart> {
    return await this.cartService.getCartByUser(userId);
  }

  @Mutation(() => CartItem, { name: 'addCartItem' })
  async addCartItem(
    @Args('cartId', { type: () => ID, nullable: true }) cartId: string,
    @Args('userId', { type: () => ID }) userId: string,
    @Args('bookId', { type: () => ID }) bookId: string,
    @Args('quantity', { type: () => Int, defaultValue: 1 }) quantity: number,
  ) {
    return await this.cartService.createCartItem(cartId, userId, bookId, quantity);
  }




}
