import { Injectable } from '@nestjs/common';
import { CreateInterceptUserDto } from './dto/create-intercept-user.dto';

@Injectable()
export class InterceptUserService {
  create(createInterceptUserDto: CreateInterceptUserDto) {
    return 'This action adds a new interceptUser';
  }

  findAll() {
    return `This action returns all interceptUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interceptUser`;
  }

  update(id: number, updateInterceptUserDto: CreateInterceptUserDto) {
    return `This action updates a #${id} interceptUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} interceptUser`;
  }
}
