import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
private UsersRepository: UsersRepository,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private AuthService:AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.UsersRepository.create(createUserDto);
  }

  async newId(_id: string, _idNew: string): Promise<User | 'User wasn`t found'> {
    return this.UsersRepository.NewId(_id, _idNew);
  }

  async findById(_id: string): Promise<User | 'User wasn`t found'> {
    return this.UsersRepository.findById(_id);
  }

  async findAll(): Promise<User[]> {
    return this.UsersRepository.findAll();
  }

  async findOne(name: string) {
    this.UsersRepository.findOne(name);
  }

  async ValidateUser(AuthDto) {
    return this.UsersRepository.validateUser(AuthDto);
  }

  async log(AuthDto) {
    return this.AuthService.log(AuthDto);
  }
}
