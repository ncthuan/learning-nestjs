import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Profile } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

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

  //general update - not optimized
  async update(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.userRepository.findOne({username}, {relations:['profile']});
    if (updateUserDto.profile && user.profile === null) {
      user.profile = new Profile();
    }
    user = Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(username: string) {
    let user = await this.userRepository.findOne({username});
    return this.userRepository.delete(user);
  }

}
