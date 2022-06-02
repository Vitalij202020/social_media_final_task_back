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
  nickName: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  })
  email: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  sex: string;

  @Prop({
    required: [true, 'Password is required'],
    minlength: 4,
  })
  password: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: new Date(Date.now()) })
  lastActive: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
