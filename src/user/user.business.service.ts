import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UserDbService } from './user.db.service';

@Injectable()
export class UserBusinessService {
  constructor(private readonly usersService: UserDbService) {
  }

  createUser(user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }

  getUsers(pagination: PaginationQueryDto): Promise<User[]> {
    return this.usersService.getUsers(pagination);
  }

  getUser(id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  updateUser(id: number, user: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  deleteUser(id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
