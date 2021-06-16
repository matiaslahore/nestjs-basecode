import { CreateUserDto } from '../../../src/user/dto/create-user.dto';
import { UserDbService } from '../../../src/user/user.db.service';

export class PopulateUser {
  constructor(private usersDBService: UserDbService) {
  }

  async populateUser(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      const user = this.createRandomUser(i);
      await this.usersDBService.createUser(user);
    }
  };

  private createRandomUser = (i: number): CreateUserDto => {
    return {
      firstName: `testName${i}`,
      lastName: `testLastName${i}`,
      email: `user${i}@rr.com`,
    };
  };
}