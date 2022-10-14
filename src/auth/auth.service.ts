import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async validateUser(name: string, pass: string,email:string): Promise<any> {
    const user =  await this.userModel.findOne({name:name, email:email, password:pass});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(AuthDto) {
    const payload = { username: AuthDto.name, password: AuthDto.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}