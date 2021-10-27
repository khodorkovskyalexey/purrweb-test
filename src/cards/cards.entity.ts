import { Columns } from "../columns/columns.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Comments } from "../comments/comments.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()   
export class Cards {
    @ApiProperty({ example: '1', description: 'Cards id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Do homework', description: 'Title of card' })
    @Column({ nullable: false })
    title: string;

    @ApiProperty({ example: 'You should do your math homework', description: 'Description of card', required: false })
    @Column()
    description: string;

    @ManyToOne(type => Columns, column => column.cards, { onDelete: 'CASCADE' })
    column: Columns;
    
    @OneToMany(type => Comments, comments => comments.card, { cascade: true })
    comments: Comments[];

    @ApiProperty({ example: '2021-10-27T04:29:33.672Z', description: 'Created date' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: '2021-10-27T04:29:33.672Z', description: 'Updated date' })
    @UpdateDateColumn()
    updatedAt: Date;
}