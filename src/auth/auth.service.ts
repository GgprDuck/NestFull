import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/users.schema';
import { AuthDto } from './dto/auth.log.dto';
import { Payload } from './interfaces/payload.interface';
import authConstants from './auth.constants';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
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

    return { accessToken, refreshToken };
  }

  public async log(authDto) {
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

    user.accessTocken = accessToken;
    user.refreshTocken = refreshToken;
    user.isEnaibled = true;

    await this.usersRepository.saveUser(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async RefreshTockens(authDto): Promise<{
    accessToken: string;
    refreshToken: string;
}> {
    const payload: Payload = {
      name: authDto.name,
      email: authDto.email,
      password: authDto.password,
    };

    const user = await this.usersRepository.validateUser(authDto);

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

      await this.usersRepository.saveUser(user);

      return {
        accessToken,
        refreshToken,
      };
    }
  }

  public async refreshAccessTocken(authDto) {
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

    user.accessTocken = accessToken;

    user.accessTocken = accessToken;

    return accessToken;
  }

  public async authLogout(authDto) {
    const user = await this.usersRepository.validateUser(authDto);
    user.isEnaibled = false;
    return user;
  }
}
