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

  async findAll(query: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: 'ASC' | 'DESC';
  }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = query.search || '';
    const sortBy = query.sortBy || 'id';
    const order = query.order === 'DESC' ? 'DESC' : 'ASC';

    const searchQuery = `%${search}%`;

    const data = await this.userRepository.query(
      `
      SELECT * FROM users 
      WHERE name LIKE ? OR username LIKE ? OR address LIKE ?
      ORDER BY ${sortBy} ${order}
      LIMIT ? OFFSET ?
      `,
      [searchQuery, searchQuery, searchQuery, limit, offset],
    );

    const total = await this.userRepository.query(
      `
      SELECT COUNT(*) as count FROM users 
      WHERE name LIKE ? OR username LIKE ? OR address LIKE ?
      `,
      [searchQuery, searchQuery, searchQuery],
    );

    return {
      data,
      total: Number(total[0].count),
      page,
      limit,
      last_page: Math.ceil(Number(total[0].count) / limit),
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
