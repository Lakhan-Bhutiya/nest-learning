import { Body, Injectable } from '@nestjs/common';
import { User } from './user.interface';


@Injectable()
export class UsersService {
customers: User[] = [];
  
    getAllUsers() {
      return this.customers;
    }
  
    setAllUsers(customer: User) {
      this.customers.push(customer);
    }
  }
  
