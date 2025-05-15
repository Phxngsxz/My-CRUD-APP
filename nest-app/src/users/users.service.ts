import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Like, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // hash password ก่อนบันทึก
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async findAll(query: any) {
  const { page = 1, limit = 10, search, sortBy = 'id', order = 'ASC' } = query;
  const where = search
    ? [
        { name: Like(`%${search}%`) },
        { username: Like(`%${search}%`) },
      ]
    : {};
  const [data, total] = await this.userRepository.findAndCount({
    where,
    skip: (page - 1) * limit,
    take: limit,
    order: { [sortBy]: order.toUpperCase() },
  });
  return {
    data,
    total,
    page: +page,
    limit: +limit,
    last_page: Math.ceil(total / limit),
  };
}

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // ถ้ามีการส่ง password ใหม่ ให้ hash ก่อน
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const result = await this.userRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found'); // Or handle the error as per your application's requirements
    }
    return user;
  }

  async create_user(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }
}
