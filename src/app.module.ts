import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module'
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ColumnsModule,
    CardsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
