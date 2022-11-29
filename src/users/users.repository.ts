import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class UsersRepository {
  @InjectModel(User.name) private UserModel: Model<UserDocument>;

  async findById(_id: string): Promise<User | null> {
    const user = await this.UserModel.findById({ _id });
    return user;
  }

  async findAll(): Promise<User[] | null> {
    return this.UserModel.find().exec();
  }

  async findOne(name: string): Promise<User | null> {
    const user = await this.UserModel.findOne({ name });
    return user;
  }

  async validateUser(signInDto:SignInDto): Promise<User | null> {
    const user = await this.UserModel.findOne(
      { name: signInDto.name, email: signInDto.email, password: signInDto.password },
      { name: 1, email: 1 },
    );
    return user;
  }

  async saveUser(user) {
    await user.save();
  }
}
