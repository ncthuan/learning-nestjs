import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Auth, Roles } from '../../decorators/decorator';
import { UserRole } from '../../database/entities/user.entity';
import {
  UpdateProfileDto,
  AdminUpdateUserDto,
  SuperAdminUpdateUserDto,
  PagingDto,
} from '../user/dto';

@Controller('admin')
@ApiTags('admin')
@Auth(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @ApiQuery({ name: 'offset', example: 0 })
  @ApiQuery({ name: 'limit', example: 10 })
  @ApiQuery({ name: 'gender', example: 'MALE', required: false })
  @ApiQuery({ name: 'birthday', example: '2021-04-02', required: false })
  async getAll(
    @Query() paging: PagingDto,
    @Query('gender') gender,
    @Query('birthday') birthday,
  ): Promise<any[]> {
    return this.userService.getUsersByProfileFilter(paging, {
      gender,
      birthday,
    });
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Post('super/user/:username')
  async SuperAdminUpdateUser(
    @Param('username') username: string,
    @Body() superAdminUpdateUserDto: SuperAdminUpdateUserDto,
  ): Promise<any> {
    return this.userService.adminUpdateUser(username, superAdminUpdateUserDto);
  }

  @Post('user/:username')
  async adminUpdateUser(
    @Param('username') username: string,
    @Body() adminUpdateUserDto: AdminUpdateUserDto,
  ): Promise<any> {
    return this.userService.adminUpdateUser(username, adminUpdateUserDto);
  }

  @Post('user/:username/profile')
  async adminUpdateProfile(
    @Param('username') username: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<any> {
    return this.userService.updateProfile(username, updateProfileDto);
  }

  @Delete('user/:username')
  async adminRemoveUser(@Param('username') username: string): Promise<any> {
    return this.userService.delete(username);
  }
}
