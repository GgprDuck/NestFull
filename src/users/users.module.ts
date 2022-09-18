import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/users.schema';
import { UsersRepoService } from './users.repo.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, UsersRepository],
  providers: [UsersService, UsersRepoService],
})
export class UsersModule {}
