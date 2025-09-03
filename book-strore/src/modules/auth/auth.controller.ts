import { Controller, Request, Post, UseGuards, Get, Body, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, Put, Req, UnauthorizedException, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from 'src/modules/auth/dto/create-auth.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RefreshTokenGuard } from 'src/modules/auth/guards/refreshToken.guard';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { ChangePasswordDto } from 'src/modules/auth/dto/change.passord.dto';
import { GoogleGuard } from 'src/modules/auth/guards/google.guard';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
import { Public } from 'src/decorator/custome';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private Mailservice: MailerService) { }


  @Post('sign-up')
  @Public()
  Register(@Body() registerDto: CreateAuthDto) {
    return this.authService.Register(registerDto)
  }

  @Post('login')
  async signIn(@Body() credentials: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(credentials, res);
  }

  @Post('logout')
  async LogOut(@Body('accessToken') accessToken: string) {
    return this.authService.LogOut(accessToken);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refreshToken')
  async RefreshToken(@Request() req) {
    return await this.authService.refreshToken(req.id, req.username, req.role);
  }


  @Put('change-password')
  @UseGuards(AuthGuard)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {

    console.log(req.user);
    const userId = req.user.sub

    return await this.authService.changePassword(
      userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @UseGuards(GoogleGuard)
  @Get('google/login')
  async googleLogin() { }

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res: Response) {

    const user = req.user;

    const accessToken = await this.authService.generateAccesstoken(user.id)


    const frontendCallbackUrl = "http://localhost:3000/api/auth/google/callback";
    if (!frontendCallbackUrl) {
      throw new Error('FRONTEND_GOOGLE_CALLBACK_URL is not defined in environment variables');
    }
    const redirectUrl = new URL(frontendCallbackUrl);

    redirectUrl.searchParams.set('accessToken', accessToken);
    redirectUrl.searchParams.set('refreshToken', user.hashedRefreshToken || '');
    redirectUrl.searchParams.set('userId', user.id); 
    redirectUrl.searchParams.set('name', user.username || 'Unknown User');
    redirectUrl.searchParams.set('role', user.role || 'user');

    return res.redirect(redirectUrl.toString());

  }

  @Get("generateToken")
  @Public()
  async Generate(@Body() body: { userId: string }) {
    return await this.authService.generateToken(body.userId);
  }

}
