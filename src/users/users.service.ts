import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Users } from './user.entity';
import * as bcrypt from 'bcryptjs'
import { AuthException } from '../exceptions/auth.exception';
import { AuthService } from './auth.service';
import { AuthUsersDto } from './dtos/auth-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private readonly authService: AuthService
        ) {}

    async findAll(options = {}): Promise<Users[]> {
        return await this.usersRepository.find(options);
    }

    async findById(id: string): Promise<Users> {
        return await this.usersRepository.findOne(id);
    }

    async findByEmail(email: string): Promise<Users> {
        return await this.usersRepository.findOne({ where: { email } })
    }

    async login(userDto: CreateUserDto): Promise<AuthUsersDto> {
        const user = await this.findByEmail(userDto.email)
        const isPasswordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && isPasswordEquals) {
            return this.authService.generateResponse(user)
        }
        throw AuthException.UnauthorizedError()
    }

    async create(userDto: CreateUserDto): Promise<AuthUsersDto> {
        const candidate = await this.findByEmail(userDto.email)
        if(candidate) {
            throw AuthException.BadRequest(`User with email: ${userDto.email} already exists`);
        }

        const hash_password = await bcrypt.hash(userDto.password, 10);
        const user = await this.usersRepository.create({ ...userDto, password: hash_password });
        await this.usersRepository.save(user);
        
        return this.authService.generateResponse(user)
    }

    async delete(id: string): Promise<boolean> {
        await this.usersRepository.delete(id);
        return true
    }

    async update(id: string, userDto: CreateUserDto): Promise<CreateUserDto> {
        const candidate = await this.findByEmail(userDto.email)
        if(candidate && candidate.id !== Number(id)) {
            throw AuthException.BadRequest(`User with email: ${userDto.email} already exists`);
        }

        const hash_password = await bcrypt.hash(userDto.password, 10)
        const updatedUser = new CreateUserDto({ ...userDto, password: hash_password })
        await this.usersRepository.update(id, updatedUser)
        return updatedUser
    }
}
