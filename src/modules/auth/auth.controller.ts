import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { SignUpDto } from './dto/auth.dto';
import { Request } from 'express';
import { retry } from 'rxjs';
import { Auth } from 'src/common/decorators/auth.decorator';


@ApiTags(SwaggerTags.Auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary:'signUp new user'})
  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  signUp(@Body() userDto:SignUpDto){
    return this.authService.signUp(userDto)

  }

  @ApiOperation({summary:'check login and get payload user login'})
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('/check-login')
  checkLogin(@Req() request:Request){
    return request.user;
  }
}
