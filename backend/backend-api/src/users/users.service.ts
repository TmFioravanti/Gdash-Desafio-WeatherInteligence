import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-passwordHash').exec();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email já está em uso');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const created = new this.userModel({
      name: dto.name,
      email: dto.email,
      passwordHash: hash,
      role: dto.role ?? 'user',
    });

    const user = await created.save();
    // Nunca exponha o hash
    user.passwordHash;
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (dto.email && dto.email !== user.email) {
      const existing = await this.findByEmail(dto.email);
      if (existing) {
        throw new ConflictException('Email já está em uso');
      }
      user.email = dto.email;
    }

    if (dto.name) user.name = dto.name;
    if (dto.role) user.role = dto.role;

    if (dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    const updated = await user.save();
    updated.passwordHash ;
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Usuário não encontrado');
  }
}
