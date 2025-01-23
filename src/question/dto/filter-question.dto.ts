// import { PartialType } from '@nestjs/mapped-types';
// import { CreateQuestionDto } from './create-question.dto';

// import { IQuestion } from "../interfaces/IQuestion";

// export class FilterQuestionDto extends PartialType(CreateQuestionDto) {}
import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Length,
    Max,
    Min,
} from 'class-validator';
import { Difficulty } from 'src/common/enum/difficulty.enum';

export class FilterQuestionDto {
    @IsEnum(Difficulty)
    difficulty?: Difficulty;

    @IsInt()
    @Min(0)
    @Max(10)
    points?: number;

}
