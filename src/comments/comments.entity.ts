import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { Cards } from "src/cards/cards.entity";
import { Users } from "src/users/user.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()   
export class Comments {
    @ApiProperty({ example: '1', description: 'Comments id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Good idea!', description: 'Comments text' })
    @Column({ nullable: false })
    text: string;

    @ManyToOne(type => Cards, card => card.comments, { onDelete: 'CASCADE' })
    card: Cards;

    @ManyToOne(type => Users, author => author.comments, { onDelete: 'CASCADE' })
    author: Users;

    @ApiProperty({ example: '2021-10-27T04:29:33.672Z', description: 'Created date' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: '2021-10-27T04:29:33.672Z', description: 'Updated date' })
    @UpdateDateColumn()
    updatedAt: Date;
}