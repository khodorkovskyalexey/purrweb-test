import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
