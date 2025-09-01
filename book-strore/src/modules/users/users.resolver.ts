import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CreateUserDto } from 'src/modules/users/dto/create-user.input';

import { User } from 'src/modules/users/entities/user.entity';
import { UserService } from 'src/modules/users/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UserService) {}


  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserDto) {
    return this.usersService.createUser(input);
  }
}
