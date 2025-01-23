import { Difficulty } from 'src/common/enum/difficulty.enum';

export interface IQuestion {
    text: string;
    answer: string;
    difficulty: Difficulty;
    points: number;
}
