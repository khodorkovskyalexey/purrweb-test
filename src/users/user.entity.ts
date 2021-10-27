import { Columns } from "../columns/columns.entity";
import { Comments } from "../comments/comments.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";

@Entity()   
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany(type => Columns, columns => columns.user, { cascade: true })
    columns: Columns;

    @OneToMany(type => Comments, comments => comments.author, { cascade: true })
    comments: Comments[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}