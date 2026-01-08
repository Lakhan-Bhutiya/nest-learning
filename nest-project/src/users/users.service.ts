import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(email: string, password: string) {
    const existingUser = await this.findByEmail(email);
  
    if (existingUser) {
      throw new Error('EMAIL_EXISTS');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = this.userRepo.create({
      email,
      password: hashedPassword,
    });
  
    return this.userRepo.save(user);
  }
  

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }
}
