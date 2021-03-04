import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'nestJsACA',
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')]
    }),
    AdminModule,
    UserModule,
    UniversityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
