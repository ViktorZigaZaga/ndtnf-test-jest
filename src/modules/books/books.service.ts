import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Book, BookDocument } from './schemas/book.schema'
import { CreateBookDto } from './interfaces/dto/create-book'
import { UpdateBookDto } from './interfaces/dto/update-book'
import { BookDtoValidate } from './interfaces/dto/book.dto.validate'

@Injectable() 
export class BooksService {
    constructor(
        @InjectModel(Book.name)
        private BookModel: Model<BookDocument>,
    ) {}

    async create(data: BookDtoValidate): Promise<BookDocument> {
        const book = new this.BookModel(data);
        return book.save();
    }

    async update(id: string, data: BookDtoValidate): Promise<BookDocument> {
        return this.BookModel.findByIdAndUpdate({ _id: id }, data);
    }

    async findAll(): Promise<BookDocument[]> {
        return this.BookModel.find().exec();
    }

    async delete(id: string): Promise<BookDocument> {
        return this.BookModel.findByIdAndRemove({ _id: id });
    }
}

