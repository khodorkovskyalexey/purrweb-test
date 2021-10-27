import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './user.entity'
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY || "SECRET_KEY",
            signOptions: {
                expiresIn: "8h"
            }
        })
    ],
    controllers: [UsersController],
    providers: [UsersService, AuthService],
    exports: [UsersService, JwtModule]
})
export class UserModule {}
