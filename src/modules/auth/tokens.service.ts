import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthMessage } from "src/common/enums";
import { JwtPayload } from "./types";

@Injectable()
export class TokensService {

    constructor(private jwtService:JwtService){}


    createJWtToken(payload:JwtPayload){
        try {
           return this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: '7d',
              });

        } catch (error) {
            throw new UnauthorizedException(AuthMessage.LoginAgain);
        }
    }
}