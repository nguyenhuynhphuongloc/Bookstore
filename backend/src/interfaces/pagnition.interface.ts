import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/modules/books/entities/book.entity';
import { User } from 'src/modules/users/entities/user.entity';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;
}



@ObjectType()
export class PaginatedBooks {
  @Field(() => [Book])
  items: Book[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}