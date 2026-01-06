import { Controller, Get } from '@nestjs/common';
import { CatsusersService } from './catsusers.service';
import { UsersService } from 'src/users/users.service';

@Controller('catsusers')
export class CatsusersController {
  constructor(private readonly catsusersService: CatsusersService,
              private readonly userService : UsersService
    ) {};

    
    @Get()
    getusers(){

      return this.userService.getAllUsers();
    }

 
}
