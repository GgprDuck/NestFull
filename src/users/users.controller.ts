import {
  Body, NotFoundException, UseGuards,
} from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common/decorators';
import {
  ApiBearerAuth,
  ApiNotFoundResponse, ApiOkResponse, ApiTags, getSchemaPath,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import JwtAuthGuard from '../guards/local.auth.guards';

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(CreateUserDto),
        },
      },
    },
    description: '200. The user successfully signed-in.',
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '404. Not Found.',
  })
  @Get('/findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(CreateUserDto),
        },
      },
    },
    description: '200. The user successfully found.',
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '404. User was not found.',
  })
  @Post('/findById')
  findById(@Body('_id') _id: string) {
    const user = this.usersService.findById(_id);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return user;
  }
}
