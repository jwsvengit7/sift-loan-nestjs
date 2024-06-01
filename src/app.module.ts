import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './config/config';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
