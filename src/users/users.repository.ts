import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  @InjectModel(User.name) private UserModel: Model<UserDocument>;

  async NewId(_id: string, _idNew: string): Promise<User | 'User wasn`t found'> {
    const user = await this.UserModel.findById({ _id });
    user.id = _idNew;
    await user.save();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
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

  async validateUser(SignInDto): Promise<User> {
    const user = await this.UserModel.findOne(
      { name: SignInDto.name, email: SignInDto.email, password: SignInDto.password },
      { name: 1, email: 1, password: 0 },
    );

    return user;
  }

  async saveUser(user) {
    await user.save();
  }
}
