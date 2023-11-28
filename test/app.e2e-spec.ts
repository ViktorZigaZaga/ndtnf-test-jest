import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BooksService } from '../src/modules/books/books.service';
import { BooksController } from '../src/modules/books/books.controller';
import { JwtAuthGuard } from '../src/modules/auth/guards/jwt.auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('Books (e2e)', () => {
  let app: INestApplication;
  let booksService = {
    findAll: () => ['test'],
    create: () => ({}),
    update: () => true,
    delete: () => true,
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
    .overrideGuard(JwtAuthGuard).useValue(new class extends AuthGuard('local') {
      canActive(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return true;
      }
    })
    .overrideProvider(BooksService).useValue(booksService)
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/book (GET)', () => {
    return request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect(booksService.findAll());
  });

  it('/book (POST)', () => {
    return request(app.getHttpServer())
      .post('/book')
      .expect(201)
      .expect(booksService.create());
  });

  it('/book/id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/book/id')
      .send({title: 'string'})
      .expect(200)
      .expect(String(booksService.update()));
  });

  it('/book/id (DELETE)', () => {
    return request(app.getHttpServer())
      .get('/book/id')
      .expect(200)
      .expect(String(booksService.delete()));
  });
  afterAll(async () => {
    await app.close();
  });
});
