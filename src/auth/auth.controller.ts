import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from '../user/dto/user.register.dto';

@Controller()
export class AUthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserRegisterDto) {
    return this.userService.create(userDto);
  }
}
