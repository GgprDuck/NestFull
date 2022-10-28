import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import authConstants from './auth.constants';
import { UsersRepository } from '../users/users.repository';
import { User, UserSchema } from '../users/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: authConstants.jwt.secret
    }),
  ],
  providers: [AuthService, UsersRepository,JwtService],
  exports:[AuthService]
})

export class AuthModule {}