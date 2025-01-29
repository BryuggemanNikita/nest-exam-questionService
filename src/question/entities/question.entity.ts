import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IQuestion } from '../interfaces/IQuestion';
import { ApiProperty } from '@nestjs/swagger';
import { IDifficulty } from 'src/difficulty/inteface/difficulty.interface';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';

@Entity('Question')
export class Question implements IQuestion {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column()
    @PrimaryGeneratedColumn({
        comment: 'The question unique identifier',
    })
    id: number;

    @ApiProperty({ example: 'Сколько?', description: 'Текст вопроса' })
    @Column()
    text: string;

    @ApiProperty({ example: 'Да', description: 'Ответ на вопрос' })
    @Column()
    answer: string;

    @ApiProperty({ example: 'HARD', description: 'Сложность вопроса' })
    @ManyToOne(() => Difficulty, (difficulty) => difficulty.questions)
    difficulty: IDifficulty;

    @ApiProperty({ example: '10', description: 'Кол-во баллов за вопрос' })
    @Column()
    points: number;
}
