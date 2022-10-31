import {
  BadRequestException, Body, Controller, NotFoundException, Post, UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, getSchemaPath,
} from '@nestjs/swagger';
import AuthService from './auth.service';
import { AuthDto } from './dto/auth.log.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

    @ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          data: {
            $ref: getSchemaPath(AuthDto),
          },
        },
      },
      description: '200. Success. Returns a user with tocken',
    })
    @ApiBadRequestResponse({
      description: '404. NotFoundException. User was not found',
    })
    @Post('/log')
  login(@Body() authUser: AuthDto) {
    const user = this.authService.log(authUser);

    if (!user) {
      throw new BadRequestException('Enter right values');
    }

    return user;
  }

    @ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          data: {
            $ref: getSchemaPath(AuthDto),
          },
        },
      },
      description: '200. Success. Returns a user with tocken',
    })
    @ApiBadRequestResponse({
      description: '404. NotFoundException. User was not found',
    })
    @Post('/logout')
    logout(@Body() authUser: AuthDto) {
      const user = this.authService.authLogout(authUser);

      if (!user) {
        throw new BadRequestException('Enter right values');
      }

      return user;
    }
}
