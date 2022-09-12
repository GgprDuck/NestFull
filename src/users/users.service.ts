import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async signIn(name: string, email: string , password: string){
    const user =  await this.userModel.findOne({name:name, email:email, password:password});
    console.log(user);
    if(user){
     return "Success"; 
    }
    return "NO";
  }

  async findById(_id: string): Promise<User | "User wasn`t found">{
    const user = await this.userModel.findById({_id: _id});
    if(user){
      return user;
    }
    return "User wasn`t found";
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
