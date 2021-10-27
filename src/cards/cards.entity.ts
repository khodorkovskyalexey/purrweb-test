import { Columns } from "../columns/columns.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";

@Entity()   
export class Cards {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column()
    description: string;

    @ManyToOne(Cards => Columns, column => column.cards, { onDelete: 'CASCADE' })
    column: Columns;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}