import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserDbService } from '../user.db.service';
import { User } from '../user.entity';


type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('UserService', () => {
  let service: UserDbService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDbService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<UserDbService>(UserDbService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const userId = 1;
        const expectedUser = {};

        userRepository.findOne.mockReturnValue(expectedUser);
        const coffee = await service.getUser(userId);
        expect(coffee).toEqual(expectedUser);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const userId = 1;
        userRepository.findOne.mockReturnValue(undefined);

        try {
          await service.getUser(userId);
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Could not find user: ${userId}.`);
          done();
        }
      });
    });
  });
});
