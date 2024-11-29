//book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const book = this.bookRepository.create(createBookInput);
    return this.bookRepository.save(book);
  }

  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
    await this.findOne(id); 
    await this.bookRepository.update(id, updateBookInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Book> {
    const book = await this.findOne(id);
    await this.bookRepository.delete(id);
    return book;
  }
}