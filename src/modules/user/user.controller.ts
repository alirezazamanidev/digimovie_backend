import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { UserService } from './user.service';
import { ContentType, SwaggerTags } from 'src/common/enums';

@ApiTags(SwaggerTags.User)
@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}
    @ApiOperation({summary:' verify emailand send verify code'})
    @HttpCode(HttpStatus.OK)
    @Post('email/verify')
    @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
    verifyEmail(@Body() verifyEmaidto:VerifyEmailDto){
        return this.userService.verifyEmail(verifyEmaidto)

    }
}
