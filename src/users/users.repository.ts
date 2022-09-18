import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { User } from './schemas/users.schema';
import { UsersRepoService } from './users.repo.service';

@Controller('/v1/repo')
@Injectable()
export class UsersRepository {
    constructor(private UsersRepoService: UsersRepoService) {}
    
    @Post('/newId')
    @ApiResponse({ status: 200, description: 'The id successfully changed',})
    changeIp(@Body('_id') _idNew:string, @Body('_id') _id:string): Promise<string | User> {
        return this.UsersRepoService.NewId(_id, _idNew);
    }
}