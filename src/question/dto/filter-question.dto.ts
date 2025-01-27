import { ApiProperty } from '@nestjs/swagger';
import { IDifficulty } from 'src/difficulty/inteface/difficulty.interface';

export class FilterQuestionDto {
    @ApiProperty({ example: 'HARD', description: 'Сложность вопроса' })
    difficultyKey?: string;

    difficulty?: IDifficulty;

    @ApiProperty({ example: '10', description: 'Кол-во баллов за вопрос' })
    points?: number;
}
