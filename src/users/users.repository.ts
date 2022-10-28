import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthDto } from '../auth/dto/auth.log.dto';
import { Payload } from '../auth/interfaces/payload.interface';
import authConstants from '../auth/auth.constants';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersRepository {
  constructor( private jwtService: JwtService,
    private authServise:AuthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async NewId(_id: string, _idNew: string): Promise<User | "User wasn`t found">{
    const user = await this.userModel.findById({_id: _id});
      user._id = _idNew;
      await user.save();
      return user;
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

  async findOne(name:string){
    const user = await this.userModel.findOne({name:name});
    if(user){
      return user;
    }
    return "User wasn`t found";
  }

async validateUser(AuthDto: AuthDto): Promise<any> {
    const user = await this.userModel.findOne({ name: AuthDto.name, email: AuthDto.email, password: AuthDto.password });
    if (user && user.password === AuthDto.password) {
        const { password, ...result } = user;
        return result;
    }
    return null;
}

async login(AuthDto) {
    const payload: Payload = {
        name: AuthDto.name,
        email: AuthDto.email,
        password: AuthDto.password,
    };

    const user = await this.userModel.findOne(AuthDto);

    const accessToken = this.jwtService.sign(payload, {
        expiresIn: authConstants.jwt.expirationTime.accessToken,
        secret: authConstants.jwt.secret,
    });
    const refreshToken = this.jwtService.sign(payload, {
        expiresIn: authConstants.jwt.expirationTime.refreshToken,
        secret: authConstants.jwt.secret,
    });

    user.accessTocken = accessToken;
    user.refreshTocken = refreshToken;
    await user.save();
    return {
        accessToken,
        refreshToken
    };
}

public async refreshTockens(authDto: AuthDto) {

    const payload: Payload = {
      name: authDto.name,
      email: authDto.email,
      password: authDto.password,
    };

    const user = await this.userModel.findOne(AuthDto);

    const check = this.authServise.verifyToken(user.accessTocken, authConstants.jwt.secret);
    if (check) {
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: authConstants.jwt.expirationTime.accessToken,
        secret: authConstants.jwt.secret,
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: authConstants.jwt.expirationTime.refreshToken,
        secret: authConstants.jwt.secret,
      });

      user.accessTocken = accessToken;
      user.refreshTocken = refreshToken;
      await user.save();

      return {
        accessToken,
        refreshToken
      };
    }
}
}
