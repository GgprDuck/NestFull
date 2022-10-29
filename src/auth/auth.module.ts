import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import authConstants from './auth.constants';
import { UsersRepository } from '../users/users.repository';
import { User, UserSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: authConstants.jwt.secret,
    }),
  ],
  providers: [AuthService, UsersRepository, JwtService],
  exports: [AuthService],
})

export class AuthModule {}
