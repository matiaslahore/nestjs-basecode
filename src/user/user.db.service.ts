import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class UserDbService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  getUsers(pagination: PaginationQueryDto): Promise<User[]> {
    const { limit, offset } = pagination;
    return this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Could not find user: ${id}.`);
    }
    return user;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    const userUpdated = await this.userRepository.preload({
      id: id,
      ...user,
    });
    if (!userUpdated) {
      throw new NotFoundException(`Could not update user: ${id}.`);
    }
    return this.userRepository.save(userUpdated);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Could not delete user: ${id}.`);
    }
    return this.userRepository.remove(user);
  }
}
