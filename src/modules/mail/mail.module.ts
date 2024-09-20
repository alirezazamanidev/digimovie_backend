import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports:[
    MailerModule.forRoot({
      transport:{

        host:process.env.SMTP_HOST,
        secure:false,
        auth:{
          user:process.env.SMTP_USERNAME,
          pass:process.env.SMTP_PASSWORD
        },
        
      },
      template:{
        dir:join(__dirname,'templates'),
        adapter:new EjsAdapter()
      },
      options:{
        strict:true
      }
    })
  ],
  providers: [MailService],
  exports:[MailService]
})
export class MailModule {}
