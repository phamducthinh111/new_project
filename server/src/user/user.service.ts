import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>
      ) {}

      async isUsernameUnique(username : any): Promise<boolean> {
        const existingUser = await this.userRepository.findOne({
          where: { username }
        });
        return !existingUser; 
      }

      async isEmailUnique(email: any): Promise<boolean> {
        const existingUser = await this.userRepository.findOne({
          where: { email },
        });
        return !existingUser;
      }

      // async isPhoneUnique(phone: any): Promise<boolean> {
      //   const existingUser = await this.userRepository.findOne({
      //     where: { phone },
      //   });
      //   return !existingUser;
      // }
      
    async createUser(createUserDto: CreateUserDto) {
        const newUser = new User();
        
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        newUser.username = createUserDto.username
        newUser.email = createUserDto.email
        newUser.password = hashedPassword
        newUser.phone = createUserDto.phone
        newUser.address = createUserDto.address
        newUser.isAdmin = 'N'
        
        this.userRepository.insert(newUser);
        return newUser;
    }

    async getAllUsers() {
        return await this.userRepository.find({
          relations: ['orders']
      });
    }

    async getUserById(userId: any) {
        return await this.userRepository.findOne({ where: { userId },relations: ['orders'] });
    }

    async updateUserById(userId: any, updateUserDto: UpdateUserDto) {
      const findUser = await this.userRepository.findOne({ where: { userId } });
      if (!findUser) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }  
      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        findUser.password = hashedPassword;
      }
      
      // findUser.password = updateUserDto.password ? hashedPassword : findUser.password
      findUser.phone = updateUserDto.phone ?? findUser.phone
      findUser.address = updateUserDto.address ?? findUser.address
      findUser.isAdmin = updateUserDto.isAdmin ?? findUser.isAdmin
      const result = await this.userRepository.update(userId, findUser);
      return result;
    }

    async deleteUser (userId: any) {
      const findUser = await this.userRepository.findOne({ where: { userId } });
      if (!findUser) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      await this.userRepository.remove(findUser);
    }

    async findOneByUsername(username: any): Promise<User | undefined> {
      return this.userRepository.findOne({ where: { username } });
    }

} 
