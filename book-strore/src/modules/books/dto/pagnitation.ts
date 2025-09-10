import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from 'src/modules/books/entities/book.entity';


@ObjectType()
export class PaginatedBooks {
  @Field(() => [Book])
  data: Book[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}