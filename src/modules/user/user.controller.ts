import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto, UpdateProfileDto } from './dto';
import { Auth } from 'src/decorators/decorator';

@Controller('user')
@ApiTags('user')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // All can access user data
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<any> {
    return this.userService.getUser(username);
  }

  @Get(':username/profile')
  async getUserProfile(@Param('username') username: string): Promise<any> {
    return this.userService.getUserProfile(username);
  }

  // All can update/del their own user data
  @Post('')
  async updateUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateUser(req.user.username, updateUserDto);
  }

  @Post('profile')
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
