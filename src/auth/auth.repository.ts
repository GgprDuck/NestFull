// import { Injectable } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import { User, UserDocument } from "../users/schemas/users.schema";
// import authConstants from "./auth.constants";
// import { AuthDto } from "./dto/auth.log.dto";
// import { Payload } from "./interfaces/payload.interface";
// import { AuthService } from "./auth.service";

// @Injectable()
// export class AuthRepository {
//     constructor(
//         private jwtService: JwtService,
//         private authServise:AuthService,
//         @InjectModel(User.name) private userModel: Model<UserDocument>
//       ) { }

//     async validateUser(AuthDto: AuthDto): Promise<any> {
//         const user = await this.userModel.findOne({ name: AuthDto.name, email: AuthDto.email, password: AuthDto.password });
//         if (user && user.password === AuthDto.password) {
//             const { password, ...result } = user;
//             return result;
//         }
//         return null;
//     }

//     async login(AuthDto) {
//         const payload: Payload = {
//             name: AuthDto.name,
//             email: AuthDto.email,
//             password: AuthDto.password,
//         };

//         const user = await this.userModel.findOne(AuthDto);

//         const accessToken = this.jwtService.sign(payload, {
//             expiresIn: authConstants.jwt.expirationTime.accessToken,
//             secret: authConstants.jwt.secret,
//         });
//         const refreshToken = this.jwtService.sign(payload, {
//             expiresIn: authConstants.jwt.expirationTime.refreshToken,
//             secret: authConstants.jwt.secret,
//         });

//         user.accessTocken = accessToken;
//         user.refreshTocken = refreshToken;
//         await user.save();
//         return {
//             accessToken,
//             refreshToken
//         };
//     }

//     public async refreshTockens(authDto: AuthDto) {

//         const payload: Payload = {
//           name: authDto.name,
//           email: authDto.email,
//           password: authDto.password,
//         };
    
//         const user = await this.userModel.findOne(AuthDto);
    
//         const check = this.authServise.verifyToken(user.accessTocken, authConstants.jwt.secret);
//         if (check) {
//           const accessToken = this.jwtService.sign(payload, {
//             expiresIn: authConstants.jwt.expirationTime.accessToken,
//             secret: authConstants.jwt.secret,
//           });
//           const refreshToken = this.jwtService.sign(payload, {
//             expiresIn: authConstants.jwt.expirationTime.refreshToken,
//             secret: authConstants.jwt.secret,
//           });
    
//           user.accessTocken = accessToken;
//           user.refreshTocken = refreshToken;
//           await user.save();
    
//           return {
//             accessToken,
//             refreshToken
//           };
//         }
//     }

// }