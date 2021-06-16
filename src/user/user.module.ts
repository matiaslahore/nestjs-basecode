import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDbService } from './user.db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserBusinessService } from './user.business.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserBusinessService, UserDbService],
})
export class UserModule {}
