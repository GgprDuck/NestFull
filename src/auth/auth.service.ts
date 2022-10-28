import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import authConstants from './auth.constants';
import { AuthDto } from './dto/auth.log.dto';
import { Payload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async validateUser(AuthDto:AuthDto): Promise<any> {
    const user =  await this.userModel.findOne({name:AuthDto.name, email:AuthDto.email, password:AuthDto.password});
    if (user && user.password === AuthDto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(AuthDto) {
    const payload: Payload  = {
      name: AuthDto._id,
      email: AuthDto.email,
      password: AuthDto.password,
    };

    const user =  await this.userModel.findOne(AuthDto);

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret: authConstants.jwt.secret,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.refreshToken,
      secret: authConstants.jwt.secret,
    });

    user.accessTocken = accessToken;
    user.refreshTocken = refreshToken;
    await user.save();
    return {
      accessToken,
      refreshToken
    };
  }

  public async verifyToken(token: string, secret: string): Promise<User | null> {
    try {
      const user = (await this.jwtService.verifyAsync(token, { secret })) as User | null;

      return user;
    } catch (error) {
      return null;
    }
  }
}