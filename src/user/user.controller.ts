import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { UserBusinessService } from './user.business.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import {
  ApiForbiddenResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiSecurity('access-key')
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersBusService: UserBusinessService) {
  }

  @Public()
  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersBusService.createUser(user);
  }

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get()
  getUsers(@Query() pagination: PaginationQueryDto): Promise<User[]> {
    return this.usersBusService.getUsers(pagination);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.usersBusService.getUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.usersBusService.updateUser(id, user);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number): Promise<User> {
    return this.usersBusService.deleteUser(id);
  }
}
