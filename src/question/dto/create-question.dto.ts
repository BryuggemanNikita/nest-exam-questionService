import { Question } from "../entities/question.entity";

export class CreateQuestionDto implements Question {
    id: number;
    name: string;
    text: string;
    answer: string;
    points: number;

    constructor(id: number,
        name: string,
        text: string,
        answer: string,
        points: number) {
        this.id = id;
        this.name = name
        this.text = text
        this.answer = answer
        this.points = points
    }
}
