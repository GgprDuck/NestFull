import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async NewId(_id: string, _idNew: string): Promise<User | "User wasn`t found">{
    const user = await this.userModel.findById({_id: _id});
    if(user){
        user._id = _idNew;
      return user.save();
    }
    return "User wasn`t found";
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
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

  async signIn(name: string, email: string , password: string){
    const user =  await this.userModel.findOne({name:name, email:email, password:password});
    console.log(user);
    if(user){
     return "Success"; 
    }
    return "NO";
  }

}
