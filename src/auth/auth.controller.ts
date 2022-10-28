import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.log.dto";

@Controller()
export default class AuthController {
    constructor(private AuthService: AuthService) { }
    @Post()
    validateUser(AuthDto:AuthDto) {
        return this.AuthService.validateUser(AuthDto);
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
    login(@Body() AuthDto:AuthDto) {
        const user = this.validateUser(AuthDto);
        if (user) {
            return this.AuthService.login(AuthDto);
        }
        else {
            throw new UnauthorizedException('Enter right values');
        }
    }
}