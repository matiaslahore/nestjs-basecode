import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => await app.close());

  it('Should be defined', () => {
    expect(app).toBeDefined();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set({ 'API-Key': process.env.API_KEY, Accept: 'application/json' })
      .expect(200)
      .expect('Hello World!');
  });
});
