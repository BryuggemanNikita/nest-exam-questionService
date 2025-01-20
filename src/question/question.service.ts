import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question)
    private questionRepository: Repository<Question>) {

    }
    create(createQuestionDto: CreateQuestionDto) {
        return this.questionRepository.save(createQuestionDto).catch((e) => {
            console.log(e);
            
        });
    }

    findAll() {
        return `This action returns all question`;
    }

    findById(id: number) {
        return `This action returns a #${id} question`;
    }

    update(id: number, updateQuestionDto: UpdateQuestionDto) {
        return `This action updates a #${id} question`;
    }

    remove(id: number) {
        return `This action removes a #${id} question`;
    }
}
