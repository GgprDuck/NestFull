import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/users.schema';
import { AuthDto } from './dto/auth.log.dto';
import { Payload } from './interfaces/payload.interface';
import authConstants from './auth.constants';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository:UsersRepository,
  ) { }

  @InjectModel(User.name) private UserModel: Model<UserDocument>;

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }

  public async verifyToken(token: string, secret: string): Promise<User | null> {
    try {
      const user = (await this.jwtService.verifyAsync(token, { secret })) as User;

      return user;
    } catch (error) {
      return null;
    }
  }

  public async log(authDto:AuthDto): Promise<{
    accessToken:string
    refreshToken:string,
  }> {
    const payload: Payload = {
      name: authDto.name,
      email: authDto.email,
      password: authDto.password,
    };

    const user = await this.usersRepository.validateUser(authDto);

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret: authConstants.jwt.secret,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.refreshToken,
      secret: authConstants.jwt.secret,
    });

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.isEnabled = true;

    await this.usersRepository.saveUser(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async RefreshTokens(authDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload: Payload = {
      name: authDto.name,
      email: authDto.email,
      password: authDto.password,
    };

    const user = await this.usersRepository.validateUser(authDto);

    const check = this.verifyToken(user.accessToken, authConstants.jwt.secret);
    if (check) {
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: authConstants.jwt.expirationTime.accessToken,
        secret: authConstants.jwt.secret,
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: authConstants.jwt.expirationTime.refreshToken,
        secret: authConstants.jwt.secret,
      });

      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      await this.usersRepository.saveUser(user);

      return {
        accessToken,
        refreshToken,
      };
    }
  }

  public async refreshAccessTocken(authDto): Promise<string> {
    const payload: Payload = {
      name: authDto.name,
      email: authDto.email,
      password: authDto.password,
    };

    const user = await this.usersRepository.validateUser(authDto);

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret: authConstants.jwt.secret,
    });

    user.accessToken = accessToken;

    return accessToken;
  }

  public async authLogout(authDto): Promise<User> {
    const user = await this.usersRepository.validateUser(authDto);
    user.isEnabled = false;
    await this.usersRepository.saveUser(user);
    return user;
  }
}
