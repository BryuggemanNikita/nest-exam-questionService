import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IQuestion } from '../interfaces/IQuestion';

@Entity('Question')
export class Question implements IQuestion {
    @PrimaryGeneratedColumn({
        comment: 'The question unique identifier',
    })
    id: number;

    @Column()
    name: string;

    @Column()
    text: string;

    @Column()
    answer: string;

    @Column()
    points: number;
}
