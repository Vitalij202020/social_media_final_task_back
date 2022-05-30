import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from '../user/dto/user.register.dto';
import { UserLoginDto } from '../user/dto/user.login.dto';

@Controller()
export class AUthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserRegisterDto) {
    return this.userService.create(userDto);
  }

  @Post('/login')
  login(@Body() userDto: UserLoginDto) {
    return this.userService.login(userDto);
  }
}
