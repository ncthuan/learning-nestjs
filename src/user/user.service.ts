import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Profile } from './entities';
import { CreateUserDto, UpdateUserDto, UpdateProfileDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = new User()
    user = Object.assign(user, createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({relations:['profile']});
  }

  async findUser(username: string): Promise<User> {
    return this.userRepository.findOne({username});
  }

  async findUserProfile(username: string): Promise<User> {
    return this.userRepository.findOne({username}, {relations:['profile']});
  }

  async updateUser(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.userRepository.findOne({username});
    if (await argon2.verify(user.password, updateUserDto.password)) {
      if (updateUserDto.newPassword)
        user.password = updateUserDto.newPassword;
      if (updateUserDto.newEmail)
      user.email = updateUserDto.newEmail;
      return this.userRepository.save(user);
    }
    else return null;
  }

  //general update - not optimized
  async updateProfile(username: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    let user = await this.userRepository.findOne({username}, {relations:['profile']});
    if (user.profile === null) {
      user.profile = new Profile();
    }
    user.profile = Object.assign(user.profile, updateProfileDto);
    return this.userRepository.save(user);
  }

  async remove(username: string) {
    let user = await this.userRepository.findOne({username});
    return this.userRepository.delete(user);
  }

}
