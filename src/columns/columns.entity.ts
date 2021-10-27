import { Users } from "../users/user.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Cards } from "../cards/cards.entity";

@Entity()   
export class Columns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @ManyToOne(type => Users, user => user.columns, { onDelete: 'CASCADE' })
    user: Users;

    @OneToMany(type => Cards, cards => cards.column, { cascade: true })
    cards: Cards[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}