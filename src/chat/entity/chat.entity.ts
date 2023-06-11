import {Entity, Column, PrimaryColumn, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class ChatEntity{
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    email:string;

    @Column({unique:true})
    text:string;

    @CreateDateColumn()
    createAt:Date;

}