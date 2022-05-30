import { Module } from '@nestjs/common';
import { AUthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AUthController],
  imports: [UserModule],
})
export default class AuthModule {}
