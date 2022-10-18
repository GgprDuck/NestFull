import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.log.dto";

@Controller()
export default class AuthController {

    constructor(private AuthService: AuthService) { }
    @Post()
    validateUser(name: string, pass: string, email: string) {
        return this.AuthService.validateUser(name, pass, email);
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
    @ApiNotFoundResponse({
        description: '404. NotFoundException. User was not found',
    })
    @Post('/log')
    login(@Body('name') name: string, @Body('password') password: string, @Body('email') email: string) {
        const user = this.validateUser(name, password, email);
        if (user) {
            return this.AuthService.login({
                name: name,
                password: password,
            })
        }
        else {
            throw new UnauthorizedException('Enter right values');
        }
    }
}