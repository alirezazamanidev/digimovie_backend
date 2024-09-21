import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/common/decorators/auth.decorator";
import { SwaggerTags } from "src/common/enums";
import { WalletService } from "../services/wallet.service";
import { RechargeWalletDto } from "../dtos/recharge-wallet.dto";

@Auth()
@ApiTags(SwaggerTags.Wallet)
@Controller('wallet')
export class WalletController {

    constructor(private readonly walletService:WalletService){}

    @ApiOperation({summary:'reCharge wallet'})
    @HttpCode(HttpStatus.OK)
    @Post('recharge')
    recharge(@Body() walletDto:RechargeWalletDto){
        return this.walletService.recharge(walletDto);

    }
}