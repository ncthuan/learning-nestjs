import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username);

    if (user && (await argon2.verify(user.password, password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return { token: this.jwtService.sign(payload) };
  }
}
