import { EntitySchema } from "typeorm";
import { Question } from "../entities/question.entity";

export const QuestionSchema = new EntitySchema<Question>({
    name: 'Question',
    target: Question,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
        },
        text: {
            type: String
        },
        answer: {
            type: String,
        },
        points: {
            type: Number
        }
    }
})