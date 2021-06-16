import { UserController } from '../user.controller';
import { User } from '../user.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { UserBusinessService } from '../user.business.service';
import { UserDbService } from '../user.db.service';

const mockedUser: User = {
  id: 1,
  firstName: 'John',
  lastName: 'hash',
  email: 'user@email.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UserController', () => {
  let userController: UserController;
  let userDbService: UserDbService;
  let userBusService: UserBusinessService;

  beforeEach(() => {
    userBusService = new UserBusinessService(userDbService);
    userController = new UserController(userBusService);
  });

  describe('getUsers', () => {
    it('should return an array of all users', async () => {
      jest.spyOn(userBusService, 'getUsers').mockImplementation(
        () => Promise.resolve([mockedUser]),
      );
      const users = await userController.getUsers(new PaginationQueryDto);
      expect(users).toStrictEqual([mockedUser]);
    });
  });
});