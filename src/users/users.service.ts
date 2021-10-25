import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async getAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getById(id: string): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async findByEmail(email: string) {
        return await this.usersRepository.findOne({ where: { email } })
    }

    async create(userDto: CreateUserDto) {
        const user = await this.usersRepository.create(userDto);
        await this.usersRepository.save(user);
        return user;
    }

    async delete(id: string) {
        return await this.usersRepository.delete(id);
    }

    async update(id: string, new_user_data: CreateUserDto) {
        return await this.usersRepository.update(id, new_user_data)
    }
}
