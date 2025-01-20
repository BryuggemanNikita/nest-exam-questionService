import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IQuestion } from "../interfaces/IQuestion";

Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    text: string;
    
    @Column()
    answer: string;
    
    @Column()
    points: number;
}
