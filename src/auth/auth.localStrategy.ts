import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.log.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UsersRepository) {
    super();
  }

}