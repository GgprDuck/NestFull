import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import authConstants from '../auth/auth.constants';

@Injectable()
export default class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      const { secret } = authConstants.jwt;

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('User is not authorized');
      }
      const user = this.jwtService.verifyAsync(token, { secret });

      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('User is not authorized');
    }
  }
}
