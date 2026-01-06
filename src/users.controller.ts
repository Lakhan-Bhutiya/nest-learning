import { Body, Controller,Delete,Get,Param,Post, Put} from '@nestjs/common';
import { CreateUserDTO } from "./dto"

let USERS: CreateUserDTO[]= []



@Controller( '/users')
export class UsersController{
    @Post("/")
    addUser(@Body() CreateUserDTO: CreateUserDTO){
        USERS.push(CreateUserDTO);
    }

    @Get("/")
    getAllUsers(){
        return USERS;
    }

    @Get("/:id")
    getUser(@Param("id") id: number){
        return USERS.find(user => user.id === +id );
    }

    @Put("/:id")
    UpdateUser(@Param("id") id: number, @Body() updateUserDTO: CreateUserDTO){
       const userIdx =  USERS.findIndex(user => user.id === +id );
       
       

       if(userIdx === -1){
        return;
       } else{
        USERS[userIdx] = updateUserDTO;
       }
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: number){
         USERS = USERS.filter(user => user.id !== +id );

    }
}