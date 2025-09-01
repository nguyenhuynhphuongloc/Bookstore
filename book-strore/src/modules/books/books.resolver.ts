import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { FilterBooksArgs } from 'src/modules/books/dto/fiterbook';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) { }

  @Mutation(() => Book)
  async createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return await this.booksService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  async findAll() {
    return await this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  async updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return await this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.remove(id);
  }

  @Query(() => [Book], { name: 'booksByCategoryName' })
 async findByCategory(
    @Args('categoryName', { type: () => String }) categoryName: string,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    return await this.booksService.GetByCategory({ categoryName, limit });
  }

  @Query(() => [Book], { name: 'booksByCategory' })
  async Patrition(@Args() filter: FilterBooksArgs) {
    return await this.booksService.Partition({
      category: filter.categoryName,
      skip: filter.skip,
      take: filter.take,
    });
  }

}
