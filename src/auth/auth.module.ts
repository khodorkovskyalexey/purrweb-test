import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY || "SECRET_KEY",
            signOptions: {
                expiresIn: "8h"
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: []
})
export class AuthModule {}
