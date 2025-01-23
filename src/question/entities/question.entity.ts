import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IQuestion } from '../interfaces/IQuestion';
import { Difficulty } from 'src/common/enum/difficulty.enum';

@Entity('Question')
export class Question implements IQuestion {
    @Column()
    @PrimaryGeneratedColumn({
        comment: 'The question unique identifier',
    })
    id: number;

    @Column({ enum: Difficulty })
    difficulty: Difficulty;

    @Column()
    text: string;

    @Column()
    answer: string;

    @Column()
    points: number;
}
