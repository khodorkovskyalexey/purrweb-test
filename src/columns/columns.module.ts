import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from '../cards/cards.module';
import { UserModule } from '../users/users.module';
import { ColumnsController } from './columns.controller';
import { Columns } from './columns.entity';
import { ColumnsService } from './columns.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => CardsModule),
        TypeOrmModule.forFeature([Columns])
    ],
    providers: [ColumnsService],
    controllers: [ColumnsController],
    exports: [ColumnsService]
})
export class ColumnsModule {}
