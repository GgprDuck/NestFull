import {
  BadRequestException, Body, Controller, Post, UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath,
} from '@nestjs/swagger';
import JwtAuthGuard from '../guards/local.auth.guards';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/schemas/users.schema';
import AuthService from './auth.service';
import { AuthDto } from './dto/auth.log.dto';
import JwtTokensDto from './dto/tokens.dto/tokens.dto';

@ApiTags('Auth')
@ApiExtraModels(JwtTokensDto)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(CreateUserDto),
        },
      },
    },
    description: '201. The user has been successfully created',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '400. BadRequestException.',
  })
  @Post('/sign-up')
  async getUser(@Body() signUpUser: CreateUserDto): Promise<User> {
    const user = await this.authService.create(signUpUser);

    if (!user) {
      throw new BadRequestException('Enter all necessary values');
    }

    return user;
  }

    @ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          data: {
            $ref: getSchemaPath(JwtTokensDto),
          },
        },
      },
      description: '200. Success. Returns a user with tocken',
    })
    @ApiBadRequestResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
          details: {},
        },
      },
      description: '404. NotFoundException. User was not found',
    })
  @Post('/sign-in')
  login(@Body() authUser: AuthDto) {
    const tokens = this.authService.log(authUser);

    if (!tokens) {
      throw new BadRequestException('Enter right values');
    }

    return tokens;
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
      description: '200. Success. Returns a user with tockens',
    })
    @ApiBadRequestResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
          details: {},
        },
      },
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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          data: {
            $ref: getSchemaPath(AuthDto),
          },
        },
      },
      description: '200. Success. Returns a user with new tockens',
    })
    @ApiBadRequestResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
          details: {},
        },
      },
      description: '404. NotFoundException. User was not found',
    })
    @Post('/refreshTokens')
    refreshTokens(@Body() authUser: AuthDto) {
      const user = this.authService.RefreshTokens(authUser);

      if (!user) {
        throw new BadRequestException('Enter right values');
      }

      return user;
    }
}
