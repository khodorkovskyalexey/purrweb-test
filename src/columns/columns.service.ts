import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Columns } from './columns.entity';
import { CreateColumnDto } from './dto/create-columns.dto';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(Columns) private columnsRepository: Repository<Columns>,
        private userService: UsersService,
        ) {}

    async getById(column_id: string, options = {}): Promise<Columns> {
        return await this.columnsRepository.findOne(column_id, options)
    }

    async getUsersColumns(user_id: string): Promise<CreateColumnDto[]> {
        return await this.columnsRepository.find({
            where: {
                user: {
                    id: user_id
                }
            }
        })
    }

    async create(columnDto: CreateColumnDto, user_id: string): Promise<CreateColumnDto> {
        const user = await this.userService.findById(user_id)        
        const column = await this.columnsRepository.create({ ...columnDto, user})
        await this.columnsRepository.save(column);
        return column;
    }

    async update(new_column: CreateColumnDto, column_id: string): Promise<CreateColumnDto> {
        await this.columnsRepository.update(column_id, new_column)
        return new_column
    }

    async delete(column_id: string): Promise<boolean> {
        await this.columnsRepository.delete(column_id)
        return true
    }
}
