import { Body, NotFoundException } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common/decorators';
import { ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { AuthService } from '../auth/auth.service';
import { error } from 'console';


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
  @ApiNotFoundResponse({
    description: '404. NotFoundException. User was not found',
  })
  @Post('/create')
  @ApiResponse({ status: 500, description: 'Forbidden.' })
  getUser(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string): Promise<User>{
    const user = this.UsersService.create({
      name: name,
      email: email,
      password: password
    });
    if(user){
      return user;
    }
    else{
      ApiNotFoundResponse;
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
    description: '500. Forbidden.',
  })
  @Post('/sign-in')
  signIn(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string) {
    return this.UsersService.signIn(name, email, password);
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
    description: '200. The user successfully signed-in.',
  })
  @ApiNoContentResponse({
    description: '500. Forbidden.',
  })
  @Post("/findById")
  @ApiResponse({ status: 200, description: 'The user successfully found', })
  findById(@Body('_id') _id: string) {
    return this.UsersService.findById(_id);
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
  @ApiNoContentResponse({
    description: '500. User not found.',
  })
  @Post('/newId')
  changeIp(@Body('_idNew') _idNew: string, @Body('_id') _id: string): Promise<string | User> {
    return this.UsersService.newId(_id, _idNew);
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
    description: '200. User signed-in.',
  })
  @ApiUnauthorizedResponse({
    description: '500. Wrong values.',
  })
  @Post("/log")
  login(@Body('name') name: string, @Body('password') password: string) {
    return this.AuthService.login({
      name: name,
      password: password
    })
  }
}