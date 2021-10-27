import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsModule } from '../columns/columns.module';
import { UserModule } from '../users/users.module';
import { CardsController } from './cards.controller';
import { Cards } from './cards.entity';
import { CardsService } from './cards.service';

@Module({
  imports: [
    forwardRef(() => ColumnsModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Cards])
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService]
})
export class CardsModule {}
