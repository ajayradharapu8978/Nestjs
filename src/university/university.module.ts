import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityRepository } from './university.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UniversityRepository])
  ],
  providers: [UniversityService],
  controllers: [UniversityController]
})
export class UniversityModule {}
