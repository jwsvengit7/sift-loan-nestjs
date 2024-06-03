import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './config/config';
import { AuthModule } from './services/auth-service/module/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
