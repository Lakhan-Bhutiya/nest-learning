import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    Header,
    Param,
    Query,
    Headers,
    Body,
  } from "@nestjs/common";
  import type { Request, Response } from "express";
  
  // --------------------
  // Interfaces
  // --------------------
  
  // Params interface
  interface VideoParams {
    id: number;
    name: string;
  }
  
  // Query interface
  interface QueryParams {
    name: string;
    age: number;
  }
  
  // DTO (Data Transfer Object)
  interface VideoDTO {
    name: string;
    tag: string;
  }
  
  @Controller("/users")
  export class UsersController {
  
    // --------------------
    // GET: Profile
    // --------------------
    @Get("/profile")
    @Header("Cache-Control", "None")
    @Header("X-name", "Lakhannn")
    getProfile(
      @Req() req: Request,
      @Res({ passthrough: true }) res: Response
    ) {
      console.log(req.params);
  
      // manual response handling
      res.status(200);
      return {
        hello: "World",
      };
    }
  
    // --------------------
    // GET: Account
    // --------------------
    @Get("/account")
    redirectRoute() {
      return {
        account: "This is your account",
      };
    }
  
    // --------------------
    // GET: Videos with params & query
    // --------------------
    @Get("videos/:id")
    getVideos(
      @Param() params: VideoParams,
      @Query() query: QueryParams,
      @Headers() headers: Record<string, any>
    ) {
      console.log(params);
      console.log(query);
      console.log(headers);
  
      return "Success";
    }
  
    // --------------------
    // POST: Add Video
    // --------------------
    @Post("/Videos")
    addVideo(@Body() requestData: VideoDTO) {
      console.log(requestData.name, requestData.tag);
  
      return {
        success: true,
      };
    }
  }
  