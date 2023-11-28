import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookDocument } from './schemas/book.schema'
import { getModelToken } from '@nestjs/mongoose';
import { CreateBookDto } from './interfaces/dto/create-book';

describe('BooksController', () => {
    let booksController: BooksController;
    let booksService: BooksService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [BooksController],
            providers: [
                BooksService,
                {
                    provide: getModelToken(Book.name),
                    useFactory: () => ({}),
                }
            ], 
            exports: [BooksService]
        }).compile();

        booksController = app.get<BooksController>(BooksController);
        booksService = app.get<BooksService>(BooksService);
    });

    it('should be defined', () => {
        expect(booksController).toBeDefined();
        expect(booksService).toBeDefined();
      });

    describe('findAll', () => {
        it('should return array', async () => {
            const library: BookDocument[] = [new Book() as BookDocument];
            jest.spyOn(booksService, 'findAll').mockImplementation(async () => library);
            expect(await booksController.findAll()).toBe(library);
        });
    });

    describe('create', () => {
        it('should create book', async () => {
            const book = new Book() as BookDocument;
            const library: BookDocument[] = [];
            jest.spyOn(booksService, 'findAll').mockImplementation(async () => library);
            jest.spyOn(booksService, 'create').mockImplementation(async () => {
                library.push(book);
                return book;
            });
            expect(await booksController.create({} as CreateBookDto)).toEqual(book);
            expect(await booksController.findAll()).toBe(library);
        });
    });
});
