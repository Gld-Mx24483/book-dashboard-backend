//auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    UserModule
  ],
  providers: [JwtStrategy],
  exports: [PassportModule]
})
export class AuthModule {}