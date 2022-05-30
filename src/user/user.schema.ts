import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: [true, 'Nickname is required'],
    unique: true,
    minlength: 3,
  })
  nickname: string;

  @Prop()
  name: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  })
  email: string;

  @Prop()
  age: number;

  @Prop({
    required: [true, 'Password is required'],
    minlength: 6,
  })
  password: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: new Date(Date.now()) })
  lastActive: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
