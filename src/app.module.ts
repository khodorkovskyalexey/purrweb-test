import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module'
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ColumnsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
