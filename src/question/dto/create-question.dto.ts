import {
    IsAlpha,
    IsInt,
    IsNotEmpty,
    IsString,
    Length,
    Max,
    Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IDifficulty } from 'src/difficulty/inteface/difficulty.interface';
import { IQuestion } from '../interfaces/IQuestion';

export class CreateQuestionDto implements IQuestion {
    @ApiProperty({ example: 'Сколько?', description: 'Текст вопроса' })
    @IsNotEmpty({ message: 'The question text cannot be empty.' })
    @IsString()
    @Length(3)
    text: string;

    @ApiProperty({ example: 'Да', description: 'Ответ на вопрос' })
    @IsNotEmpty({ message: 'The question answer cannot be empty.' })
    @IsString()
    @Length(3)
    answer: string;

    @ApiProperty({ example: 'HARD', description: 'Сложность вопроса' })
    @IsAlpha()
    difficultyKey: string;

    difficulty: IDifficulty;

    @ApiProperty({ example: '10', description: 'Кол-во баллов за вопрос' })
    @IsNotEmpty({ message: 'The question points cannot be empty.' })
    @IsInt()
    @Min(0)
    @Max(10)
    points: number;
}
