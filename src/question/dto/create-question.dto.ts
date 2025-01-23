import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Length,
    Max,
    Min,
} from 'class-validator';
import { IQuestion } from '../interfaces/IQuestion';
import { Difficulty } from 'src/common/enum/difficulty.enum';

export class CreateQuestionDto implements IQuestion {
    @IsNotEmpty({ message: 'The question difficulty cannot be empty.' })
    @IsEnum(Difficulty)
    difficulty: Difficulty;

    @IsNotEmpty({ message: 'The question text cannot be empty.' })
    @IsString()
    @Length(3)
    text: string;

    @IsNotEmpty({ message: 'The question answer cannot be empty.' })
    @IsString()
    @Length(3)
    answer: string;

    @IsNotEmpty({ message: 'The question points cannot be empty.' })
    @IsInt()
    @Min(0)
    @Max(10)
    points: number;
}
