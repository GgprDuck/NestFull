import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/users.schema';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})

export class UsersModule {}
