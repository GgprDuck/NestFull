import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/users.schema';
import { AuthDto } from './dto/auth.log.dto';
import { Payload } from './interfaces/payload.interface';
import authConstants from './auth.constants';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository:UsersRepository,
  ) { }

  public async verifyToken(token: string, secret: string): Promise<User | null> {
    try {
      const user = (await this.jwtService.verifyAsync(token, { secret })) as User | null;

      return user;
    } catch (error) {
      return null;
    }
  }

  public async pushTockens(authDto: AuthDto) {
    const payload: Payload = {
      name: authDto.name,
      email: authDto.email,
      password: authDto.password,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret: authConstants.jwt.secret,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.refreshToken,
      secret: authConstants.jwt.secret,
    });

    return {accessToken, refreshToken}
  }

  public async log(AuthDto:AuthDto) {

    const payload: Payload = {
      name: AuthDto.name,
      email: AuthDto.email,
      password: AuthDto.password,
    };
    
    const user = await this.usersRepository.validateUser(AuthDto);

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

  public async RefreshTockens(AuthDto:AuthDto) {

    const payload: Payload = {
      name: AuthDto.name,
      email: AuthDto.email,
      password: AuthDto.password,
    };

    const user = await this.usersRepository.validateUser(AuthDto);

    const check = this.verifyToken(user.accessTocken, authConstants.jwt.secret);
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