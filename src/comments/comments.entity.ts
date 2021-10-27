import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { Cards } from "src/cards/cards.entity";
import { Users } from "src/users/user.entity";

@Entity()   
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    text: string;

    @ManyToOne(type => Cards, card => card.comments, { onDelete: 'CASCADE' })
    card: Cards;

    @ManyToOne(type => Users, author => author.comments, { onDelete: 'CASCADE' })
    author: Users;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}