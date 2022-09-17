import { Body } from '@nestjs/common';
import { Controller, Get, Post, Query, Req } from '@nestjs/common/decorators';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from 'd:/StartNest/users-books/src/users/schemas/users.schema';

@Controller('/v1/user')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'The user has been successfully created.',})
  @ApiResponse({ status: 500, description: 'Forbidden.'})
  getUser(@Body('name') name:string, @Body('email') email:string, @Body('password') password:string): Promise<User> {
    return this.UsersService.create({
      name: name,
      email: email,
      password: password
    });
  }

    @Post('/sign-in')
    @ApiResponse({ status: 200, description: 'The user successfully signed-in.',})
    @ApiResponse({ status: 500, description: 'Forbidden.'})
    signIn(@Body('name') name:string, @Body('email') email:string, @Body('password') password:string){
      return this.UsersService.signIn(name, email, password);
    }

    @Get('/findAll')
    @ApiResponse({ status: 200, description: 'List off all users.',})
    @ApiResponse({ status: 404, description: 'Not found',})
    findAll(){
      return this.UsersService.findAll();
    }

    @Post("/findById")
    @ApiResponse({ status: 200, description: 'The user successfully found',})
    findById(@Body('_id') _id:string){
      return this.UsersService.findById(_id);
    }
  }