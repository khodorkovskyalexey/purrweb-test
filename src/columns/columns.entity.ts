import { Users } from "../users/user.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Cards } from "../cards/cards.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()   
export class Columns {
    @ApiProperty({ example: '1', description: 'Column id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'ToDo list', description: 'Name of column' })
    @Column({ nullable: false })
    name: string;

    @ManyToOne(type => Users, user => user.columns, { onDelete: 'CASCADE' })
    user: Users;

    @OneToMany(type => Cards, cards => cards.column, { cascade: true })
    cards: Cards[];

    @ApiProperty({ example: '2021-10-27T04:29:33.672Z', description: 'Created date' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: '2021-10-27T04:29:33.672Z', description: 'Updated date' })
    @UpdateDateColumn()
    updatedAt: Date;
}