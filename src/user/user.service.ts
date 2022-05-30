import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserRegisterDto } from './dto/user.register.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserLoginDto } from './dto/user.login.dto';

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

  async login(userDto: UserLoginDto) {
    const user = await this.userModel.findOne({ email: userDto.email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isValidPassword = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    return {
      token,
      user: { ...user.toObject(), password: null },
    };
  }
}
