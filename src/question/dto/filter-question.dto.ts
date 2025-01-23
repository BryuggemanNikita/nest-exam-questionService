import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { Difficulty } from 'src/common/enum/difficulty.enum';

export class FilterQuestionDto {
    @IsEnum(Difficulty)
    difficulty?: Difficulty;

    @IsInt()
    @Min(0)
    @Max(10)
    points?: number;
}
