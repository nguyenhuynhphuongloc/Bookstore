import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import {  ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get<string>('MAIL_HOST'),
                    secure: false,
                    auth: {
                        user: config.get<string>('Mail_User'),
                        pass: config.get<string>('Mail_password'),
                    },
                    connectionTimeout: 10000,
                },
                defaults: {
                    from: `"No Reply" <${config.get<string>('dsa')}>`,
                },
                template: {
                    dir: join(__dirname, 'mails'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }
