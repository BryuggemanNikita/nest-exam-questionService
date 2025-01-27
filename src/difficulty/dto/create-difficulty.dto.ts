import {
    IsAlpha,
    IsNotEmpty,
    IsString,
    Length,
    Validate,
} from 'class-validator';
import { IDifficulty } from '../inteface/difficulty.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDifficultyDto implements IDifficulty {
    @ApiProperty({ example: 'HARD', description: 'Ключевое слово, описывающее сложность вопроса' })
    @IsNotEmpty({ message: 'The difficulty key cannot be empty.' })
    @IsString()
    @IsAlpha()
    key: string;

    @ApiProperty({ example: 'Сложный уровень', description: 'Описание сложности' })
    @IsNotEmpty({ message: 'The difficulty key cannot be empty.' })
    @IsString()
    @Length(2)
    discription: string;
}
