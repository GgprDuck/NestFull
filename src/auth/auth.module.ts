import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth.localStrategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import authConstants from './auth.constants';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: authConstants.jwt.secret
    }),
  ],
  providers: [AuthService],
  exports:[AuthService]
})

export class AuthModule {}