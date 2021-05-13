import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import * as argon2 from 'argon2';
import { LoginUsernameDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async validateUserPass(dto: LoginUsernameDto): Promise<any> {
    const user = await this.userService.getUser(dto.username);

    if (user && (await argon2.verify(user.password, dto.password))) {
      return user;
    }
    throw new UnauthorizedException(); // need to specify
  }

  async loginByUsername(loginUsernameDto: LoginUsernameDto) {
    const user = await this.validateUserPass(loginUsernameDto);
    return this.createJWT(user);
  }

  async createJWT(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
