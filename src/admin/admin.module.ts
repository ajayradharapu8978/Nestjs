import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { adminRepository } from './admin.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecretKy',
      signOptions: {
        expiresIn: '1h'
      }
    }),
    TypeOrmModule.forFeature([adminRepository])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
