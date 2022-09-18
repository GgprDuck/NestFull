import { Model } from 'mongoose';
import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersRepoService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async NewId(_id: string, _idNew: string): Promise<User | "User wasn`t found">{
    const user = await this.userModel.findById({_id: _id});
    if(user){
        user._id = _idNew;
      return user.save();
    }
    return "User wasn`t found";
  }
}
