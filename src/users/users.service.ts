import { Injectable } from '@nestjs/common';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private UsersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.UsersRepository.create(createUserDto)
  }

  async newId(_id: string, _idNew: string): Promise<User | "User wasn`t found">{
    return this.UsersRepository.NewId(_id, _idNew);
  }

  

  async findById(_id: string): Promise<User | "User wasn`t found"> {
    return this.UsersRepository.findById(_id);
  }

  async findAll(): Promise<User[]>{
    return this.UsersRepository.findAll();
  }

  async signIn(name: string, email: string , password: string){
    return this.UsersRepository.signIn(name, email, password);
  }
}
