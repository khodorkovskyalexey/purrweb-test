import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from 'src/cards/cards.module';
import { ColumnsModule } from 'src/columns/columns.module';
import { UserModule } from 'src/users/users.module';
import { CommentsController } from './comments.controller';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    forwardRef(() => CardsModule),
    forwardRef(() => ColumnsModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Comments])
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
