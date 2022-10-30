import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import AuthService from './auth.service';
import authConstants from './auth.constants';
import { User, UserSchema } from '../users/schemas/users.schema';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: authConstants.jwt.secret,
    }),
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService],
  controllers: [AuthController],
})

export class AuthModule {}
