import { Injectable } from '@nestjs/common';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  async findById(_id: string): Promise<User | 'User wasn`t found'> {
    return this.usersRepository.findById(_id);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(name: string) {
    this.usersRepository.findOne(name);
  }

  async ValidateUser(AuthDto) {
    return this.usersRepository.validateUser(AuthDto);
  }
}
