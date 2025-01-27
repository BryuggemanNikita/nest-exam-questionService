import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IDifficulty } from '../inteface/difficulty.interface';
import { IQuestion } from 'src/question/interfaces/IQuestion';
import { Question } from 'src/question/entities/question.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Difficulty')
export class Difficulty implements IDifficulty {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column()
    @PrimaryGeneratedColumn({
        comment: 'The question unique identifier',
    })
    id: number;

    @ApiProperty({ example: 'HARD', description: 'Ключевое слово, описывающее сложность вопроса' })
    @Column({ unique: true })
    key: string;

    @ApiProperty({ example: 'Сложный уровень', description: 'Описание сложности' })
    @Column()
    discription: string;

    @OneToMany(() => Question, (question) => question.difficulty)
    questions: IQuestion[];
}
