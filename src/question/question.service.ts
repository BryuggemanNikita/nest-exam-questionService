import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { IQuestion } from './interfaces/IQuestion';
import { FilterQuestionDto } from './dto/filter-question.dto';
import { error } from 'console';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) { }

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

    async findByFilter(filterQuestionDto: FilterQuestionDto): Promise<void> {
        console.log(filterQuestionDto);

        console.log(await this.questionRepository.findBy(filterQuestionDto));
    }

    async update(
        id: number,
        updateQuestionDto: UpdateQuestionDto,
    ): Promise<IQuestion> {
        await this.questionRepository.update(id, updateQuestionDto).catch((err) => {
            throw new HttpException({
                "error": "Bad Request",
                "statusCode": 400
            }, HttpStatus.BAD_REQUEST)
        });
        return this.findById(id);
    }

    async remove(id: number) {
        const removeRes = await this.questionRepository.delete(id);
        if (removeRes.affected === 0)
            throw new NotFoundException(`Question with id:${id} not found`);
    }
}
