import { IsNotEmpty, Length } from 'class-validator';
import { IQuestion } from '../interfaces/IQuestion';

export class CreateQuestionDto implements IQuestion {

    @IsNotEmpty({ message: 'The question name cannot be empty.' })
    @Length(3)
    name: string;

    @IsNotEmpty({ message: 'The question text cannot be empty.' })
    @Length(3)
    text: string;

    @IsNotEmpty({ message: 'The question answer cannot be empty.' })
    answer: string;

    @IsNotEmpty({ message: 'The question name cannot be empty.' })
    points: number;
}
