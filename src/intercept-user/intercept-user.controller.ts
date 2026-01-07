import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req ,Headers} from '@nestjs/common';
import { InterceptUserService } from './intercept-user.service';
import { CreateInterceptUserDto } from './dto/create-intercept-user.dto';
import { CustomInterceptor } from 'src/Interceptors/custom.interceptor';


@UseInterceptors(CustomInterceptor)
@Controller('intercept-user')
export class InterceptUserController {
  constructor(private readonly interceptUserService: InterceptUserService) {}

  @Post()
  create(@Body() createInterceptUserDto: CreateInterceptUserDto) {
    return this.interceptUserService.create(createInterceptUserDto);
  }
 
  @Get()
  findAll(@Req() { user}, @Headers('accept-language') language) {
    console.log(language);
    return this.interceptUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interceptUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterceptUserDto:CreateInterceptUserDto ) {
    return this.interceptUserService.update(+id, updateInterceptUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interceptUserService.remove(+id);
  }
}
