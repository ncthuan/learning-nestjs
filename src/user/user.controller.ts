import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto, UpdateProfileDto } from './dto';
import { Auth } from '../decorator';

@Controller('user')
@ApiTags('user')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  //
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<any> {
    return this.userService.getUser(username);
  }

  @Get(':username/profile')
  async getUserProfile(@Param('username') username: string): Promise<any> {
    return this.userService.getUserProfile(username);
  }

  //
  @Post('')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateUser(req.user.username, updateUserDto);
  }

  @Post('profile')
  @UsePipes(ValidationPipe)
  async updateProfile(
    @Req() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<any> {
    return this.userService.updateProfile(req.user.username, updateProfileDto);
  }

  @Delete('')
  async deleteUser(@Req() req): Promise<any> {
    return this.userService.delete(req.user.username);
  }
}
