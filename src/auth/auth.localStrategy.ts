import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.log.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(AuthDto:AuthDto): Promise<any> {
    const user = await this.authService.validateUser(AuthDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}