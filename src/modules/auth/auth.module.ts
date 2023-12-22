import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { appConf } from 'src/config';

@Module({
  imports: [
    JwtModule.register({
      secret: appConf.JWTSecret,
      signOptions: { expiresIn: '7d' }, // 7d for test
    })
  ],
  providers: [JwtAuthGuard, RolesGuard],
  exports: [JwtAuthGuard, RolesGuard, JwtModule],
})
export class AuthModule {}