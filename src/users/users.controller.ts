import {
  BadRequestException, Body, NotFoundException, UseGuards,
} from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, getSchemaPath,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthDto } from '../auth/dto/auth.log.dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(User),
        },
      },
    },
    description: '201. The user has been successfully created',
  })
  @ApiBadRequestResponse({
    description: '400. BadRequestException.',
  })
  @Post('/create')
  async getUser(@Body() signUpUser: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(signUpUser);

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
          $ref: getSchemaPath(User),
        },
      },
    },
    description: '200. The user successfully signed-in.',
  })
  @ApiNotFoundResponse({
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
          $ref: getSchemaPath(User),
        },
      },
    },
    description: '200. The user successfully found.',
  })
  @ApiNotFoundResponse({
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
