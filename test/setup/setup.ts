import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/user/user.entity';
import { UserDbService } from '../../src/user/user.db.service';
import { PopulateUser } from './DBPopulate/populate.user';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

export const setup = async () => {

  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule, TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [UserDbService],
  }).compile();

  // We need to drop once, not in every createTestingModule
  process.env.DATABASE_DROP_SCHEMA = 'false';

  const app: INestApplication = module.createNestApplication();
  await app.init();

  const usersDBService = module.get(UserDbService);
  const userTest: PopulateUser = new PopulateUser(usersDBService);

  await userTest.populateUser(2);

  await app.close();
};
