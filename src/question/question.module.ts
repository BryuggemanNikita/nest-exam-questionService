import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionSchema } from './schemas/question.question.';


@Module({
    imports: [TypeOrmModule.forFeature([Question])],
    exports: [TypeOrmModule],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule { }