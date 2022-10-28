// import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
// import { ApiNotFoundResponse, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
// import { AuthDto } from "./dto/auth.log.dto";

// @Controller()
// export default class AuthController {
//     constructor(
//         private authRepository: AuthRepository
//         ) { }
//     @Post()
//     validateUser(AuthDto:AuthDto) {
//         return this.authRepository.validateUser(AuthDto);
//     }

//     @ApiOkResponse({
//         schema: {
//             type: 'object',
//             properties: {
//                 data: {
//                     $ref: getSchemaPath(AuthDto),
//                 },
//             },
//         },
//         description: '200. Success. Returns a user with tocken',
//     })
//     @ApiNotFoundResponse({
//         description: '404. NotFoundException. User was not found',
//     })
//     @Post('/log')
//     login(@Body() AuthDto:AuthDto) {
//         const user = this.validateUser(AuthDto);
//         if (user) {
//             return this.authRepository.login(AuthDto);
//         }
//         else {
//             throw new UnauthorizedException('Enter right values');
//         }
//     }
// }