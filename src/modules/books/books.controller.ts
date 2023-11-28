import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDtoValidate } from './interfaces/dto/book.dto.validate';
import { BookDocument } from './schemas/book.schema';
import { IdValidationPipe } from '../../validations/id.validation.pipe';
import { DtoValidationPipe } from '../../validations/dto.validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post() 
  async create(@Body(DtoValidationPipe) createBookDto: BookDtoValidate) {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<BookDocument[]> {
    return await this.booksService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body(DtoValidationPipe) updateBookDto: BookDtoValidate
  ): Promise <BookDocument> {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', IdValidationPipe) id: string,
  ): Promise <BookDocument> {
    return await this.booksService.delete(id);
  }
}
