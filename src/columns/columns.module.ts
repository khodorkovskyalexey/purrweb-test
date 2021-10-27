import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/users/users.module';
import { ColumnsController } from './columns.controller';
import { Columns } from './columns.entity';
import { ColumnsService } from './columns.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        TypeOrmModule.forFeature([Columns])
    ],
    providers: [ColumnsService],
    controllers: [ColumnsController],
    exports: [ColumnsService]
})
export class ColumnsModule {}
