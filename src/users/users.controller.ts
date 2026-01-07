import { Body, Controller, Get, HttpException, HttpStatus, Optional, ParseIntPipe, Post, Query, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';

import { error } from 'console';
import { MyFirstPipe } from 'src/pipes/my-first.pipe';
import { ToNumberPipe } from 'src/pipes/toNumber.pipe';
import { CustomPipe } from 'src/pipes/custom.pipe';
import { User } from 'src/dto/user.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { CustomInterceptor } from 'src/Interceptors/custom.interceptor';
// @UseGuards(AuthenticationGuard)
@Controller('users')
export class UsersController {
  constructor(@Optional() private readonly usersService: UsersService) {}
  @UseInterceptors(CustomInterceptor)
  @Get()
  // we can use pipe in query to 
  // we can set the parameter by making instance of that pipe
  getAllCustomers(@Query('limit',new ParseIntPipe()) limit) {
    console.log('The type of limit is ',typeof limit);
    console.log(limit);
    return this.usersService.getAllUsers();
    // throw new HttpException(
    //   {error : true ,serverTime : new Date(),message : 'hey error'},HttpStatus.BAD_GATEWAY,
    //   {cause : 'error happend because of us'});
      // we cam use throw new ForbiddenException(cause : 'error happend because of us') too if we dont want to use this 
    
  }
  // @UsePipes(CustomPipe)

  @Post()
  setAllCustomers(@Body() body: User,@Query() query ) {
    this.usersService.setAllUsers(body);
    return {
      message: 'User added successfully',
      data: this.usersService.getAllUsers(),
    };
}


}


//  CAN create custom exception 
// export class ForbiddenException extends HttpException {
//   constructor(){
//     super('Forbidden',HttpException.FORBIDDEN);
//   }
// }
