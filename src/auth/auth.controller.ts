import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
// import { ApiBody, ApiTags } from '@nestjs/swagger';
// import { LoginUsernameDto } from 'src/user/dto';

@Controller()
// @ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // @ApiBody({ type: LoginUsernameDto })
  async login(@Req() req): Promise<any> {
    return this.authService.login(req.user);
  }

}


