import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConnections } from './database.connection';
import { Module } from '@nestjs/common';

@Module({
  imports: [...databaseConnections],
  exports: [TypeOrmModule],
})

export class DatabaseModule {}