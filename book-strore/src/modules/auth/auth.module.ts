import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import jwtConfig from 'src/modules/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import refreshjwtConfig from 'src/modules/auth/config/refreshjwt.config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mails/mail.service';
import { BlacklistService } from 'src/modules/Blacklist/blacklist.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GoogleStrategy } from 'src/modules/auth/stragegies/google.strategy';
import { JwtStrategy } from 'src/modules/auth/stragegies/jwt.strategy';
import googleOuth from 'src/modules/auth/config/google.outh';
import { UserModule } from 'src/modules/users/users.module';
import { BlacklistModule } from 'src/modules/Blacklist/blacklist.module';
import { Blacklist } from 'src/modules/Blacklist/entities/blacklist.entity';
import { RefreshToken } from 'src/modules/auth/entities/RefreshToken.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Blacklist,RefreshToken]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshjwtConfig),
    ConfigModule.forFeature(googleOuth),
    forwardRef(() => UserModule), 
    forwardRef(() => BlacklistModule),  
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    MailService,
    BlacklistService,
    AuthGuard,
    GoogleStrategy,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    AuthGuard,
    JwtModule,
  ],
})
export class AuthModule {}
