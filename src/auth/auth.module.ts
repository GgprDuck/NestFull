import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth.localStrategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy,AuthService],
  exports:[AuthService]
})
export class AuthModule {}