import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {


    constructor(private readonly mailerService:MailerService){}

    async sendCodeForEmail(email:string,username:string,token:string){
     const rcesult=   await this.mailerService.sendMail({
            to:email,
            from:'digimovie@gmail.com',
            subject:'دیجی مووی تایید ایمیل',
            template:'./send-code.ejs',
            context:{
                username,
                url:`${process.env.URL_SERVER}/user/email/check/${token}`

            }
        });
        
    }
}
