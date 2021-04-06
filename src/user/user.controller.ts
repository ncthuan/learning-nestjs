import { 
  Controller, Get, Post, Put, Delete, 
  Body, Param, Render,
  UsePipes, UseGuards, UseInterceptors, UploadedFile, HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UpdateProfileDto } from './dto';
import { ValidationPipe } from './validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('user')
@ApiTags('user') 
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<Object> {
    const user = await this.userService.create(createUserDto);
    return ;
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
    let user: any = await this.userService.findUserProfile(username);
    if (!user.profile) user.profile = {name: username};
    Object.setPrototypeOf(user, Object.prototype);
    return user;
  }

  @UseInterceptors(FileInterceptor('avatar',{dest: './public/upload/avatar'}))
  @UseGuards(JwtAuthGuard)
  @Put(':username')
  @UsePipes(ValidationPipe)
  @Render('profile')
  async update(
    @Param('username') username: string, 
    @Body() formData: any,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Object> {
    let update = new UpdateUserDto();
    update.profile = new UpdateProfileDto();
    if (file) {
      update.profile.avatarURL = file.filename;
    }
    if (formData.isStudent === "on") formData.isStudent = true;
    update.profile = Object.assign(update.profile, formData);
    
    console.log(file);
    console.log(formData);
    //throw new HttpException("", 500)
    const user: Object = await this.userService.update(username, update);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  async remove(@Param('username') username: string): Promise<Object> {
    return this.userService.remove(username);
  }

}
