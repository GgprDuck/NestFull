import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class UsersRepository {
  @InjectModel(User.name) private UserModel: Model<UserDocument>;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const result = createUserDto.email.includes('@');
    if (result) {
      const createdUser = new this.UserModel(createUserDto);
      return createdUser.save();
    }
  }

  async findById(_id: string): Promise<User | 'User wasn`t found'> {
    const user = await this.UserModel.findById({ _id });
    if (user) {
      return user;
    }
    return 'User wasn`t found';
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async findOne(name: string) {
    const user = await this.UserModel.findOne({ name });
    if (user) {
      return user;
    }
    return 'User wasn`t found';
  }

  async validateUser(signInDto:SignInDto): Promise<User | any> {
    const user = await this.UserModel.findOne(
      { name: signInDto.name, email: signInDto.email, password: signInDto.password },
      { name: 1, email: 1, password: 1 },
    );
    if (user && user.password === signInDto.password) {
      const result = { _id: user.id, name: user.name, email: user.email };
      return result;
    }
  }

  async saveUser(user) {
    await user.save();
  }
}
