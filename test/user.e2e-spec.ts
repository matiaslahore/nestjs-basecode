import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AppModule } from '../src/app.module';

describe('User (e2e)', () => {
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

  it('(GET) /users ', () => {
    const limit = 2;
    return request(app.getHttpServer())
      .get(`/users?limit=${limit}`)
      .set({ 'API-Key': process.env.API_KEY, Accept: 'application/json' })
      .expect(200)
      .then(res => expect(res.body.length).toEqual(limit));
  });
});
