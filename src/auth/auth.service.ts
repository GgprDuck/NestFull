import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  public async verifyToken(token: string, secret: string): Promise<User | null> {
    try {
      const user = (await this.jwtService.verifyAsync(token, { secret })) as User | null;

      return user;
    } catch (error) {
      return null;
    }
  }

}