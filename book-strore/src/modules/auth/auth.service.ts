import { Body, Inject, Injectable, InternalServerErrorException, Logger, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/helpers/util';
import { error } from 'console';
import { ConfigType } from '@nestjs/config';
import { hash, verify } from 'argon2';
import refreshjwtConfig from 'src/modules/auth/config/refreshjwt.config';
import jwtConfig from 'src/modules/auth/config/jwt.config';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { AuthPayload } from 'src/modules/auth/types/auth-jwtPayload';
import { UserService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mails/mail.service';

@Injectable()
export class AuthService {


  constructor(

    private readonly userService: UserService,

    private jwtService: JwtService,

    @InjectRepository(User) private userRepo: Repository<User>,


    @Inject(refreshjwtConfig.KEY) private refreshJwtConfig: ConfigType<typeof refreshjwtConfig>,

    @Inject(jwtConfig.KEY) private jwtConfigrulation: ConfigType<typeof jwtConfig>,

    private mailService: MailService

  ) { }

  async verifyUser(username: string, password: string): Promise<any> {

    try {

      const user = await this.userService.getUserByName(username)

      const isVailidPassword = await comparePassword(password, user.password)


      if (!isVailidPassword) throw new UnauthorizedException('Invalid password');

      return user != null ? user : null;

    }

    catch {
      Logger.error("Error in verifyUser:", error);

      throw new UnauthorizedException("error in Verify AuthService")

    }


  }

  async login(@Body() credentials: LoginDto, @Res({ passthrough: true }) res: Response) {

    const { email, password } = credentials;

    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException("User not found");

    const { accessToken, refreshToken } = await this.generateToken(user.id)

    const hashedRefreshToken = await hash(refreshToken)

    await this.userService.updateHashedRefreshToken(user.id, hashedRefreshToken)

    if (!user.id) throw new Error("User ID không tồn tại");

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) throw new Error("Mật khẩu sai");



    return {
      user: {
        id: user.id,
        name: user.username || null,
        role: user.role
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    };

  }

  async generateAccesstoken(userId: string) {

    const payload = { sub: userId };

    const accessToken = await this.jwtService.sign(payload, this.jwtConfigrulation);

    return accessToken;

  }


  async generateRefreshToken(userId: string) {

    const payload = { sub: userId };

    const refressToken = await this.jwtService.sign(payload, this.refreshJwtConfig);

    return refressToken;

  }

  async LogOut(userId: string) {
    return await this.userService.updateHashedRefreshToken(userId, null)
  }


  async changePassword(userId, oldPassword, newPassword) {

    console.log(userId)
    const user = await this.userRepo.findOne({ where: { id: userId } })
    console.log("currentuser", user)

    if (!user) {
      throw Error("User not found")
    }

    const passwrodMatch = await comparePassword(oldPassword, user.password)

    if (!passwrodMatch) throw Error("Wrong credentitals");

    const newHashPassword = await hashPassword(newPassword)

    if (!newHashPassword) throw new InternalServerErrorException("Hash password error");

    user.password = newHashPassword

    await this.userRepo.save(user)

    return { message: "Password updated successfully" };

  }


  async Register(registerDto: CreateAuthDto) {
    return this.userService.register(registerDto)
  }


  async validateJwtUser(userId: string) {
    return this.userRepo.findOne({ where: { id: userId } });
  }

  async generateToken(userId: string) {

    const payload: AuthPayload = { sub: userId }

    const [accessToken, refreshToken] = await Promise.all([

      this.jwtService.signAsync(payload, this.jwtConfigrulation),

      this.jwtService.signAsync(payload, this.refreshJwtConfig),

    ]);

    return {

      accessToken,

      refreshToken

    }
  }


  async valiateGoogleLogin(profile: any) {

    const email = profile.emails?.[0]?.value;

    if (!email) {
      throw new Error('Email not found in Google profile');
    }


    let user = await this.userRepo.findOne({ where: { email } });

    if (!user) throw new Error("User not found");

    const refreshToken = await this.generateRefreshToken(user.id)

    if (user) {
      return user;
    }


    user = this.userRepo.create({

      email,
      hashedRefreshToken: refreshToken,
      username: profile.id,
      password: "123"

    });

    await this.userRepo.save(user);

    console.log("Created Google user:", user);

    return user;

  }

  async validateRefreshToken(userId: string, refreshToken: string) {

    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new UnauthorizedException("User not found");

    if (!user.hashedRefreshToken) {
      throw new UnauthorizedException('No refresh token found for user');
    }

    const refreshTokenMatch = await verify(user.hashedRefreshToken, refreshToken);

    if (!refreshTokenMatch) throw new UnauthorizedException('Invalid Refresh Token')


    const currentuser = { id: user.id, username: user.username };

    return currentuser;
  }

  async refreshToken(userId: string, username: string, role: string) {

    const { accessToken, refreshToken } = await this.generateToken(userId);

    return {
      id: userId,
      username,
      role:
        accessToken,
      refreshToken,
    }

  }

  async loginGoole(userId: string) {


    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new UnauthorizedException("User not found");

    const { accessToken, refreshToken } = await this.generateToken(user.id)

    const hashedRefreshToken = await hash(refreshToken)

    await this.userService.updateHashedRefreshToken(user.id, hashedRefreshToken)

    if (!user?.id) throw new Error("User ID không tồn tại");

    return {
      user: {
        id: user.id,
        name: user.username || null,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }


}
