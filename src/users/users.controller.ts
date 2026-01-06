import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './user.interface';
import { error } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllCustomers(): User[] {
    throw new HttpException(
      {error : true ,serverTime : new Date(),message : 'hey error'},HttpStatus.BAD_GATEWAY,
      {cause : 'error happend because of us'});
    return this.usersService.getAllUsers();
  }

  @Post()
  setAllCustomers(@Body() body: User) {
    this.usersService.setAllUsers(body);
    return {
      message: 'User added successfully',
      data: this.usersService.getAllUsers(),
    };
}
}
