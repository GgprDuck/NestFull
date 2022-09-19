import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private UsersRepository: UsersRepository,@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.UsersRepository.create(createUserDto)
  }

  async newId(_id: string, _idNew: string): Promise<User | "User wasn`t found">{
    return this.UsersRepository.NewId(_id, _idNew);
  }

  async signIn(name: string, email: string , password: string){
    const user =  await this.userModel.findOne({name:name, email:email, password:password});
    console.log(user);
    if(user){
     return "Success"; 
    }
    return "NO";
  }

  async findById(_id: string): Promise<User | "User wasn`t found"> {
    return this.UsersRepository.findById(_id);
  }

  async findAll(): Promise<User[]>{
    return this.UsersRepository.findAll();
  }
}
