import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';

import { User } from 'src/modules/users/entities/user.entity';
import { UserService } from 'src/modules/users/users.service';
import { MailService } from 'src/mails/mail.service';
import { CacheModule } from '@nestjs/cache-manager';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MailModule } from 'src/mails/mail.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => BlacklistModule),
    MailModule, 
    CacheModule.register()
  ],
  providers: [ UsersResolver,UserService,MailService],
  exports: [UserService],
})
export class UserModule { }


