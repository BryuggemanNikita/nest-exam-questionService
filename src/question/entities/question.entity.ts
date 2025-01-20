import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Question')
export class Question {
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
