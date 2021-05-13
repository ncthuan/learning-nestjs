import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUsernameDto } from './dto';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({
    type: CreateUserDto, // eslint-disable-next-line prettier/prettier
    description: 'Sample register:  {"username":"admin", "password":"admin", "email":"admin@admin"}',
  })
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.authService.createUser(createUserDto);
    return this.authService.createJWT(user);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginUsernameDto,
    description: 'Sample login:  {"username":"admin", "password":"admin"}',
  })
  async login(@Body() loginUsernameDto: LoginUsernameDto): Promise<any> {
    return this.authService.loginByUsername(loginUsernameDto);
  }
}
