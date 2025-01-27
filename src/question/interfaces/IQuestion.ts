import { IDifficulty } from 'src/difficulty/inteface/difficulty.interface';

export interface IQuestion {
    text: string;
    answer: string;
    difficulty: IDifficulty;
    points: number;
}
