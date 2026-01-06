// Total two type of middleware function and class based when we need dependency we will use class based middleware

import { Injectable,Logger,NestMiddleware } from "@nestjs/common";
import {Request,Response , NextFunction } from "express";



@Injectable()
export class Middleware3 implements NestMiddleware{
    constructor (private logger :Logger ){}
    use(req: Request,res : Response,next :NextFunction){
        const {method ,path :url} = req;
        const reqTime = new Date().getTime();
        res.on('finish',()=>{
            const {statusCode } = res;
            const resTime = new Date().getTime();
            if (statusCode ===201 || statusCode=== 200) {
                this.logger.log(
                    `${method} ${url} ${statusCode } - ${resTime -reqTime}ms`,
                );
            }
        });
        next();
    }
}






//why class middleware needed because when we want to inject any dependancy to the middleware we can do that with that...