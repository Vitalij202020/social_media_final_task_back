import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserRegisterDto } from './dto/user.register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') public userModel: Model<UserDocument>) {}

  async create(userDto: UserRegisterDto): Promise<string> {
    const isEmailExist = await this.userModel.findOne({ email: userDto.email });
    if (isEmailExist) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isNickNameExist = await this.userModel.findOne({
      nickname: userDto.nickname,
    });
    if (isNickNameExist) {
      throw new HttpException(
        'User with this nickname already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userModel.create({
      ...userDto,
      password: hashPassword,
    });
    return user._id;
  }
}
