import { BadRequestException, Body, ConflictException, NotFoundException } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common/decorators';
import { ApiBadRequestResponse,  ApiNotFoundResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { AuthService } from '../auth/auth.service';


@Controller('/v1/user')
export class UsersController {
  constructor(private UsersService: UsersService,
    private AuthService: AuthService) { }

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
  getUser(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string): Promise<User> {
    const user = this.UsersService.create({
      name: name,
      email: email,
      password: password
    });

    if (!user) {
      throw new ConflictException('Enter all necessary values');
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
  @ApiBadRequestResponse({
    description: '404. Not found.',
  })
  @Post('/sign-in')
  signIn(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string) {
    try {
      return this.UsersService.signIn(name, email, password);
    }
    catch (error) {
      return new BadRequestException("Wrong entered valuses");
    }
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
    description: '404. Forbidden.',
  })
  @Get('/findAll')
  findAll() {
    return this.UsersService.findAll();
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
  @Post("/findById")
  findById(@Body('_id') _id: string) {
    try {
      return this.UsersService.findById(_id);
    }
    catch (error) {
      throw new NotFoundException("User was not found");
    }
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
    description: '200. The id successfully changed.',
  })
  @ApiNotFoundResponse({
    description: '404. User not found.',
  })
  @Post('/newId')
  changeIp(@Body('_idNew') _idNew: string, @Body('_id') _id: string): Promise<string | User> {
    try {
      return this.UsersService.newId(_id, _idNew);
    }
    catch (error) {
      throw new NotFoundException("User was not found");
    }
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
  @ApiBadRequestResponse({
    description: '400. BadRequestException.',
  })
  @Post("/log")
  login(@Body('name') name: string, @Body('password') password: string) {
    try {
      return this.AuthService.login({
        name: name,
        password: password
      })
    }
    catch(error){
      return new BadRequestException("Wrong entered valuses");
    }
  }
}