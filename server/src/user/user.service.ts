import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Role } from 'src/libs/decorators/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async isUsernameUnique(username: any): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    return !existingUser;
  }

  async isEmailUnique(email: any): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    return !existingUser;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new User();

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = hashedPassword;
    newUser.phone = createUserDto.phone;
    newUser.address = createUserDto.address;
    newUser.createDate = new Date();
    newUser.createUser = createUserDto.username;
    newUser.updateDate = new Date();
    newUser.updateUser = createUserDto.username;
    newUser.role = Role.employess;
    this.userRepository.insert(newUser);

    return newUser;
  }

  async createEmloyess(createEmloyess: CreateUserDto, currentUserId: any) {
    const user = await this.userRepository.findOne({ where: {userId: currentUserId } });

    const newUser = new User();
    const hashedPassword = await bcrypt.hash(createEmloyess.password, 10);
    newUser.username = createEmloyess.username;
    newUser.email = createEmloyess.email;
    newUser.password = hashedPassword;
    newUser.phone = createEmloyess.phone;
    newUser.address = createEmloyess.address;
    newUser.createDate = new Date();
    newUser.createUser = user.username;
    newUser.updateDate = new Date();
    newUser.updateUser = user.username;
    newUser.role = createEmloyess.role 
    this.userRepository.insert(newUser);

    return newUser;
  }

  
  async getAllUsers() {
    return await this.userRepository.find({
      relations: ['orders'],
    });
  }

  async getUserById(userId: any) {
    return await this.userRepository.findOne({
      where: { userId },
      relations: ['orders'],
    });
  }

  async findUserById(username: string) {
    return this.userRepository.findOneBy({ username, delFlag: false });
  }

  async updateUserById( updateUserDto: UpdateUserDto, currentIdUser:any) {
    const findUser = await this.userRepository.findOne({ where: { userId: currentIdUser} });
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentIdUser} not found`);
    }
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      findUser.password = hashedPassword;
    }

    // findUser.password = updateUserDto.password ? hashedPassword : findUser.password
    findUser.phone = updateUserDto.phone ?? findUser.phone;
    findUser.address = updateUserDto.address ?? findUser.address;
    findUser.updateDate = new Date();
    findUser.updateUser = findUser.username;
    findUser.role = updateUserDto.role ?? findUser.role

    const result = await this.userRepository.update(currentIdUser, findUser);
    return result;
  }

  async deleteUser(userId: any) {
    const findUser = await this.userRepository.findOne({ where: { userId } });
    if (!findUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    await this.userRepository.remove(findUser);
  }

  async deleteUserByAdmin(userId: any) {
    const findUser = await this.userRepository.findOne({ where: { userId } });
    if (!findUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    await this.userRepository.remove(findUser);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username, delFlag: false } });
  }

}
