import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.log.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authRepository: AuthRepository) {
    super();
  }

  async validate(AuthDto:AuthDto): Promise<any> {
    const user = await this.authRepository.validateUser(AuthDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}