import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/libs/decorators/role.enum';
import {
  CreateUserDto,
  PasswordProfileDto,
  UpdateRoleDto,
  UpdateUserDto,
} from './dto';
import { query } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async isUsernameUnique(username: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    return !existingUser;
  }

  async isEmailUnique(email: string): Promise<boolean> {
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
    newUser.role = Role.user;
    this.userRepository.insert(newUser);

    return newUser;
  }

  async findOneByUsernameOfEpl(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
        delFlag: false,
        role: Not(Role.user), // Điều kiện để loại trừ người dùng với role 'USER'
      },
    });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
        delFlag: false,
      },
    });
  }

  async findOneById(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      select: {
        email: true,
        role: true,
        phone: true,
        username: true,
        sex: true,
        fullname: true,
        birthday: true,
        address: true,
        userId: true,
      },
      where: { userId, delFlag: false },
    });
  }

  async getUserById(userId: number) {
    return await this.userRepository.findOne({
      where: { userId, delFlag: false },
      relations: ['orders'],
    });
  }

  //admin, manager
  async createEmloyess(createEmloyess: CreateUserDto, currentUserId: number) {
    const user = await this.userRepository.findOne({
      where: { userId: currentUserId },
    });

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
    newUser.role = createEmloyess.role;
    this.userRepository.insert(newUser);

    return newUser;
  }

  // async getAllUsers(): Promise<any> {
  //   return await this.userRepository.find({
  //     where: { delFlag: false },
  //     relations: ['orders'],
  //   });
  // }

  async updateUserById(updateUserDto: UpdateUserDto, currentUserId: number) {
    const findUser = await this.userRepository.findOne({
      where: { userId: currentUserId },
    });
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
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
    findUser.sex = updateUserDto.sex ?? findUser.sex;
    findUser.birthday = updateUserDto.birthday ?? findUser.birthday;
    findUser.fullname = updateUserDto.fullname ?? findUser.fullname;
    findUser.role = updateUserDto.role ?? findUser.role;
    await this.userRepository.update(currentUserId, findUser);
    return findUser;
  }

  async resetPassword(userId: number, currentUserId: number) {
    const findUser = await this.userRepository.findOne({ where: { userId } });
    const findCurrenUser = await this.userRepository.findOne({
      where: { userId: currentUserId },
    });
    if (!findUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (findCurrenUser.role !== Role.admin && findCurrenUser.role !== Role.manager) {
      throw new NotFoundException(
        `Account doesn't have permission to update Role`,
      );
    }
    const passwordDefaut = '1111'
    const hashedPassword = await bcrypt.hash(passwordDefaut, 10);
    findUser.updateDate = new Date();
    findUser.updateUser = findCurrenUser.username;
    findUser.password = hashedPassword;
    await this.userRepository.update(userId, findUser);
    return findUser;
  }

  async changePasswordById(
    passwordProfileDto: PasswordProfileDto,
    currentUserId: number,
  ) {
    const findUser = await this.userRepository.findOne({
      where: { userId: currentUserId },
    });
    if (!findUser) {
      throw new NotFoundException(`User with id ${currentUserId} not found`);
    }
    const passwordMatches = await bcrypt.compareSync(
      passwordProfileDto.currentPassword,
      findUser.password,
    );
    if (!passwordMatches) {
      throw new NotFoundException('Password is incorrect');
    }
    const hashedPassword = await bcrypt.hash(
      passwordProfileDto.newPassword,
      10,
    );
    findUser.password = hashedPassword;
    findUser.updateDate = new Date();
    findUser.updateUser = findUser.username;

    await this.userRepository.update(currentUserId, findUser);
    return findUser;
  }

  async removeUser(userId: number, currentUserId: number) {
    const findUser = await this.userRepository.findOne({ where: { userId } });
    const findCurrenUser = await this.userRepository.findOne({
      where: { userId: currentUserId },
    });
    if (!findUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (
      findCurrenUser.role === Role.admin ||
      findCurrenUser.role === Role.manager
    ) {
      findUser.delFlag = true;
      findUser.updateUser = findCurrenUser.username;
      findUser.updateDate = new Date();
      return await this.userRepository.update(userId, findUser);
    }
    throw new NotFoundException(`Account doesn't have permission to delete`);
  }

  //admin
  async deleteUserByAdmin(userId: number, currentUserId: number) {
    const findUser = await this.userRepository.findOne({ where: { userId } });
    const findCurrenUser = await this.userRepository.findOne({
      where: { userId: currentUserId },
    });
    if (!findUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (findCurrenUser.role !== Role.admin) {
      throw new NotFoundException(`Account doesn't have permission to delete`);
    }
    return await this.userRepository.delete(userId);
  }

  async rollBackUserByAdmin(userId: number, currentUserId: number) {
    const findUser = await this.userRepository.findOne({
      where: { userId, delFlag: true },
    });
    const findCurrenUser = await this.userRepository.findOne({
      where: { userId: currentUserId },
    });
    if (!findUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (findCurrenUser.role !== Role.admin) {
      throw new NotFoundException(
        `Account doesn't have permission to Rollback`,
      );
    }
    findUser.updateUser = findCurrenUser.username;
    findUser.updateDate = new Date();
    findUser.delFlag = false;
    const result = await this.userRepository.update(userId, findUser);
    return result;
  }

  async getAllUsers(
    currentUserId: number,
    username?: string,
    role?: Role,
    delFlag?: boolean,
  ) {
    const findCurrenUser = await this.userRepository.findOne({
      where: { userId: currentUserId },
    });
    if (!findCurrenUser) {
      throw new NotFoundException('Current user not found');
    }

    if (delFlag && findCurrenUser.role !== Role.admin) {
      throw new NotFoundException(
        `Account doesn't have permission to view deleted users`,
      );
    }

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // Thêm điều kiện delFlag
    if (delFlag !== undefined) {
      queryBuilder.andWhere('user.delFlag = :delFlag', { delFlag });
    }

    // Thêm điều kiện tìm kiếm theo username nếu có
    if (username) {
      queryBuilder.andWhere('LOWER(user.username) LIKE LOWER(:username)', {
        username: `%${username}%`,
      });
    }

    // Thêm điều kiện tìm kiếm theo role nếu có
    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    // Lấy tối đa 10 kết quả nếu có điều kiện tìm kiếm
    if (username) {
      queryBuilder.take(10);
    }

    const result = await queryBuilder.getMany();
    return result;
  }

  async updateRoleByAdmin(
    userId: number,
    currentUserId: number,
    updateRoleDto: UpdateRoleDto,
  ) {
    const findUser = await this.userRepository.findOne({ where: { userId } });
    if (!findUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const findCurrenUser = await this.userRepository.findOne({
      where: { userId: currentUserId },
    });
    if (findCurrenUser.role !== Role.admin && findCurrenUser.role !== Role.manager) {
      throw new NotFoundException(
        `Account doesn't have permission to update Role`,
      );
    }
    findUser.role = updateRoleDto.role ?? findUser.role;
    findUser.updateUser = findCurrenUser.username;
    findUser.updateDate = new Date();
    const result = await this.userRepository.update(userId, findUser);
    return result;
  }
}
