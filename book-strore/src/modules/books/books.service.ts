import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const book = this.bookRepository.create(createBookInput);
    return this.bookRepository.save(book);
  }


  async findOne(id: number): Promise<Book | null> {
    return this.bookRepository.findOneBy({ id });
  }

  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
    await this.bookRepository.update(id, updateBookInput);
    const updatedBook = await this.bookRepository.findOneBy({ id });
    if (!updatedBook) {
      throw new Error(`Book with id ${id} not found`);
    }
    return updatedBook;
  }

  async remove(id: number): Promise<Book | null> {
    const book = await this.bookRepository.findOneBy({ id });
    if (book) {
      await this.bookRepository.remove(book);
    }
    return book;
  }
   async findAll({ skip, take }: { skip?: number; take?: number } = {}) {
    return this.bookRepository.find({ skip, take });
  }

  async Partition({ category, skip, take }: { category: string ; skip: number; take: number }) {
    return this.bookRepository.find({
      where: { categories:category }, 
      skip,
      take,
    });
  }

  async GetByCategory({
  categoryName,
  limit,
}: {
  categoryName: string;
  limit?: number;
}) {
  return this.bookRepository.find({
    where: { categories: categoryName  }, 
    take: limit, 
  });
}
}
