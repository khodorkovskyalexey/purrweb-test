import { Columns } from "../columns/columns.entity";
import { Comments } from "../comments/comments.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()   
export class Users {
    @ApiProperty({ example: '1', description: 'User id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
    @Column({ nullable: false })
    email: string;

    @ApiProperty({ example: '$2a$10$Oz5ndu.h50cJldGyko5OiO2fTeOrKsJrVLKYHvPIan8F8pl/54n1y', description: 'Hash password' })
    @Column({ nullable: false })
    password: string;

    @OneToMany(type => Columns, columns => columns.user, { cascade: true })
    columns: Columns;

    @OneToMany(type => Comments, comments => comments.author, { cascade: true })
    comments: Comments[];

    @ApiProperty({ example: '2021-10-27T04:29:33.672Z', description: 'Created date' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: '2021-10-27T04:29:33.672Z', description: 'Updated date' })
    @UpdateDateColumn()
    updatedAt: Date;
}