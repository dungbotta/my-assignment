import { Module } from '@nestjs/common';
import MongoClientProvider from '../repository/database';
import Repository from '../repository/mongo.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [MongoClientProvider, Repository],
  exports: [Repository],
})
class DatabaseModule {}

export default DatabaseModule;
