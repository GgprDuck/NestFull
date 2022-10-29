import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UsersRepository) {
    super();
  }
}
