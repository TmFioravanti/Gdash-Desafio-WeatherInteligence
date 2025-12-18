import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminSeeder implements OnModuleInit {
  private readonly logger = new Logger(AdminSeeder.name);

  constructor(
    private readonly usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async onModuleInit() {
    const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.DEFAULT_ADMIN_PASSWORD || '123456';

    const existing = await this.userModel.findOne({ email }).exec();
    if (existing) {
      this.logger.log(`Admin padrão já existe (${email}).`);
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    await this.userModel.create({
      name: 'Administrador',
      email,
      passwordHash: hash,
      role: 'admin',
    });

    this.logger.log(`Admin padrão criado: ${email} / ${password}`);
  }
}
