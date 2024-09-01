import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { CheckOtpDTo, SendOtpDTo } from './dto/auth.dto';


@ApiTags(SwaggerTags.Auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiOperation({summary:'Send otp (one time password)'})
  @HttpCode(HttpStatus.OK)
  @Post('send-otp')
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  sendOtp(@Body() userDto:SendOtpDTo){
     return this.authService.sendOtp(userDto);
  }
  @ApiOperation({summary:'check otp (one time password)'})
  @HttpCode(HttpStatus.OK)
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  @Post('check-otp')
  checkOtp(@Body() userDto:CheckOtpDTo){
     return this.authService.checkOtp(userDto);
  }
}
