import { Columns } from "../columns/columns.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Comments } from "../comments/comments.entity";

@Entity()   
export class Cards {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column()
    description: string;

    @ManyToOne(type => Columns, column => column.cards, { onDelete: 'CASCADE' })
    column: Columns;
    
    @OneToMany(type => Comments, comments => comments.card, { cascade: true })
    comments: Comments[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}