import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { IQuestion } from './interfaces/IQuestion';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) {}

    async create(createQuestionDto: CreateQuestionDto): Promise<IQuestion> {
        const question: IQuestion =
            this.questionRepository.create(createQuestionDto);
        return await this.questionRepository.save(question);
    }

    async findAll(): Promise<IQuestion[]> {
        const questions: IQuestion[] = await this.questionRepository.find();
        return questions;
    }

    async findById(id: number): Promise<IQuestion> {
        const question: IQuestion = await this.questionRepository.findOneBy({
            id: id,
        });
        if (!question)
            throw new NotFoundException(`Question with id:${id} not found`);
        return question;
    }

    async update(
        id: number,
        updateQuestionDto: UpdateQuestionDto,
    ): Promise<IQuestion> {
        await this.questionRepository.update(id, updateQuestionDto);
        return this.findById(id);
    }

    async remove(id: number) {
        const deleteRes = await this.questionRepository.delete(id);
        if (deleteRes.affected === 0)
            throw new NotFoundException(`Question with id:${id} not found`);
    }
}
