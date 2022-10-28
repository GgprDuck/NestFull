import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authServise: AuthService,
  ) { }

  async NewId(_id: string, _idNew: string): Promise<User | "User wasn`t found"> {
    const user = await this.userModel.findById({ _id: _id });
    user._id = _idNew;
    await user.save();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findById(_id: string): Promise<User | "User wasn`t found"> {
    const user = await this.userModel.findById({ _id: _id });
    if (user) {
      return user;
    }
    return "User wasn`t found";
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(name: string) {
    const user = await this.userModel.findOne({ name: name });
    if (user) {
      return user;
    }
    return "User wasn`t found";
  }

  async validateUser(SignInDto: SignInDto): Promise<any> {
    const user = await this.userModel.findOne({ name: SignInDto.name, email: SignInDto.email, password: SignInDto.password });
    if (user && user.password === SignInDto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(AuthDto) {

    const user = await this.userModel.findOne(AuthDto);

    const tockens = this.authServise.pushTockens(AuthDto);

    user.accessTocken = (await tockens).accessToken;
    user.refreshTocken = (await tockens).refreshToken;
    await user.save();
    return {
      tockens
    };
  }

}

