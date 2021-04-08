import { 
  Controller, Get, Post, Put, Delete, 
  Body, Param, Render,
  UsePipes, UseGuards, UseInterceptors, UploadedFile, 
  HttpException, HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UpdateProfileDto } from './dto';
import { ValidationPipe } from './validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


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

  @UseGuards(JwtAuthGuard)
  @Put(':username')
  @UsePipes(ValidationPipe)
  @Render('profile')
  async updateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto): Promise<Object> {    
    const user: Object = await this.userService.updateUser(username, updateUserDto);
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination:'./public/upload/avatar',
      filename: (req, file, cb) => {
        cb(null, file.originalname);  // need to improve
      }
    })
  }))
  @UseGuards(JwtAuthGuard)
  @Put(':username/profile')
  @UsePipes(ValidationPipe)
  @Render('profile')
  async updateProfile(
    @Param('username') username: string, 
    @UploadedFile() avatarFile: Express.Multer.File,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Object> {
    if (avatarFile) {
      updateProfileDto.avatarURL = '/upload/avatar/'+avatarFile.filename;
    }
    const user: Object = await this.userService.updateProfile(username, updateProfileDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/profile')
  @Render('profile_form')
  async getProfile(@Param('username') username: string): Promise<Object> {
    const user: Object = await this.userService.findUserProfile(username);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  async remove(@Param('username') username: string): Promise<Object> {
    return this.userService.remove(username);
  }

}
