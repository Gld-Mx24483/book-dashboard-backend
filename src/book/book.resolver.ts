import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Resolver(() => Book)
@ApiTags('books')
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => [Book])
  @ApiOperation({ summary: 'Get all books' })
  async getBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(() => Book)
  @ApiOperation({ summary: 'Get a book by ID' })
  async getBook(@Args('id', { type: () => Int }) id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  @ApiOperation({ summary: 'Create a new book' })
  async createBook(@Args('createBookInput') createBookInput: CreateBookInput): Promise<Book> {
    return this.bookService.create(createBookInput);
  }

  @Mutation(() => Book)
  @ApiOperation({ summary: 'Update a book' })
  async updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput): Promise<Book> {
    return this.bookService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  @ApiOperation({ summary: 'Delete a book' })
  async deleteBook(@Args('id', { type: () => Int }) id: number): Promise<Book> {
    return this.bookService.remove(id);
  }
}