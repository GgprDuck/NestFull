import { BadRequestException, Body, NotFoundException } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { AuthService } from '../auth/auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
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
  async getUser(@Body() signUpUser: CreateUserDto): Promise<User> {
    const user = await this.UsersService.create(signUpUser);

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
    const user = this.UsersService.findById(_id);

    if (!user) {
      throw new NotFoundException("User was not found");
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
    description: '200. The id successfully changed.',
  })
  @ApiNotFoundResponse({
    description: '404. User not found.',
  })
  @Post('/newId')
  async changeIp(@Body('_idNew') _idNew: string, @Body('_id') _id: string): Promise<string | User> {
      const user =  await this.UsersService.newId(_id, _idNew);

      if(!user){
       throw new NotFoundException("User was not found"); 
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
    description: '400. BadRequestException.',
  })
  @Post("/log")
  login(@Body() user: SignInDto) {
    const tockens = this.AuthService.login(user);

    if (!tockens) {
      throw new BadRequestException("Wrong entered valuses");
    }

    return tockens;
  }
}