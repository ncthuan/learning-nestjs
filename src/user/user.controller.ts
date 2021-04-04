import { 
  Controller, Get, Post, Put, Delete, 
  Body, Param,
  UsePipes, UseGuards,
  Render
} from '@nestjs/common';
import { UserService } from './user.service';
import { Profile, User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ValidationPipe } from './validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
// @ApiTags('user') @ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<Object> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  //@Role admin
  async findAll(): Promise<Object[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  @Render('profile')
  async findOne(@Param('username') username: string): Promise<Object> {
    const user = await this.userService.findUserProfile(username);
    if (!user.profile) {
      user.profile = new Profile();
      user.profile.name = username;
    }
    Object.setPrototypeOf(user, Object.prototype);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':username')
  @Render('profile')
  @UsePipes(ValidationPipe)
  async update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto): Promise<Object> {
    return this.userService.update(username, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  async remove(@Param('username') username: string): Promise<any> {
    return this.userService.remove(username);
  }

}
