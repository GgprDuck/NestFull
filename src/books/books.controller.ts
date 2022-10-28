import { BadRequestException, Body, UnauthorizedException, UseGuards} from '@nestjs/common';
import { Controller, Post, } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './books.dto/create-books.dto';
import { AuthService } from '../auth/auth.service';
import authConstants from '../auth/auth.constants';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class BooksController {
  constructor(
    private BooksService: BooksService,
    private AuthServise: AuthService,
    ) { }
  
  @UseGuards(AuthGuard)

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(Book),
        },
      },
    },
    description: '200. Success. Returns a book',
  })
  @ApiBadRequestResponse({
    description: '400. BadRequestException.',
  })
  @Post('/createBook')
  async create(@Body() createBookDto: CreateBookDto) {
    const user = await this.AuthServise.validateUser({email:createBookDto.email, password:createBookDto.password});
    const quest = await this.AuthServise.verifyToken(user, authConstants.jwt.secret);
    if(!quest){
     throw new UnauthorizedException('Wrong tocken');
    }

   const book = await this.BooksService.create(createBookDto);

    if(!book){
      throw new BadRequestException('Enter all necessary values');
    }

    return book;  
  }
}