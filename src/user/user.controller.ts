import { 
  Controller, 
  Get, Post, Put, Delete, 
  Body, Param, 
  UsePipes, UseGuards 
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities';
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
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  //@Role admin
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findUser(username);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':username')
  @UsePipes(ValidationPipe)
  async update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(username, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  async remove(@Param('username') username: string) {
    return this.userService.remove(username);
  }

}
