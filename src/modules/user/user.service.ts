import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Profile } from 'src/database/entities';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateProfileDto,
  SuperAdminUpdateUserDto,
  PagingDto,
} from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    let user = new User();
    user = Object.assign(user, createUserDto);
    return this.userRepository.save(user);
  }

  async getUsersByProfileFilter(
    paging: PagingDto,
    profileParams: UpdateProfileDto,
  ): Promise<User[]> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile');

    if (profileParams.gender)
      query.where('profile.gender = :gender', { gender: profileParams.gender });

    if (profileParams.birthday)
      // eslint-disable-next-line prettier/prettier
      query.andWhere('profile.birthday = :birthday', { birthday: profileParams.birthday });

    return query.skip(paging.offset).take(paging.limit).getMany();
  }

  async getUser(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  async getUserProfile(username: string): Promise<User> {
    return this.userRepository.findOne(
      { username },
      { relations: ['profile'] },
    );
  }

  async updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ username });

    if (await argon2.verify(user.password, updateUserDto.password)) {
      if (updateUserDto.newPassword) user.password = updateUserDto.newPassword;

      if (updateUserDto.newEmail) user.email = updateUserDto.newEmail;

      return this.userRepository.save(user);
    } else
      throw new HttpException(
        'Unauthorized: wrong password',
        HttpStatus.UNAUTHORIZED,
      );
  }

  async adminUpdateUser(
    username: string,
    updateUserDto: SuperAdminUpdateUserDto,
  ): Promise<User> {
    let user = await this.userRepository.findOne({ username });
    user = Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  //general update - not optimized
  async updateProfile(
    username: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne(
      { username },
      { relations: ['profile'] },
    );

    if (user.profile === null) {
      user.profile = new Profile();
    }

    user.profile = Object.assign(user.profile, updateProfileDto);

    return this.userRepository.save(user);
  }

  async delete(username: string) {
    const user = await this.userRepository.findOne({ username });
    return this.userRepository.delete(user);
  }
}
