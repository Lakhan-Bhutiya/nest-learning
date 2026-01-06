import { IsInt, IsString } from "class-validator";

export  class User {
    @IsInt()
    id: number;
    @IsString()
    name: string;
    @IsInt()
    age: number;
  }
  