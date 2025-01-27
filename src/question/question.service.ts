import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { IQuestion } from './interfaces/IQuestion';
import { FilterQuestionDto } from './dto/filter-question.dto';
import { DifficultyService } from 'src/difficulty/difficulty.service';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        private readonly difficultyService: DifficultyService,
    ) {}

    async create(createQuestionDto: CreateQuestionDto): Promise<IQuestion> {
        const difficultyKeyCandidat = createQuestionDto.difficultyKey;
        const difficulty = await this.difficultyService.findByKey(
            difficultyKeyCandidat,
        );
        createQuestionDto.difficulty = difficulty;

        const question: IQuestion =
            this.questionRepository.create(createQuestionDto);

        return await this.questionRepository.save(question);
    }

    async findAll(): Promise<IQuestion[]> {
        const questions: IQuestion[] = await this.questionRepository.find({
            relations: { difficulty: true },
        });
        return questions;
    }

    async findById(id: number): Promise<IQuestion> {
        const question: IQuestion = await this.questionRepository.findOne({
            where: {
                id: id,
            },
            relations: { difficulty: true },
        });
        if (!question) {
            throw new NotFoundException(`Question with id:${id} not found`);
        }
        return question;
    }

    async findByFilter(
        filterQuestionDto: FilterQuestionDto,
    ): Promise<IQuestion[]> {
        const difficultyKey = filterQuestionDto.difficultyKey;
        if (difficultyKey) {
            filterQuestionDto.difficulty =
                await this.difficultyService.findByKey(difficultyKey);
            filterQuestionDto.difficultyKey = null;
        }
        console.log(filterQuestionDto);

        const resFindByFilter: IQuestion[] = await this.questionRepository
            .find({ where: filterQuestionDto, relations: { difficulty: true } })
            .catch((err) => {
                console.log(err);

                throw new BadRequestException();
            });
        return resFindByFilter;
    }

    async update(
        id: number,
        updateQuestionDto: UpdateQuestionDto,
    ): Promise<IQuestion> {
        await this.questionRepository
            .update(id, updateQuestionDto)
            .catch(() => {
                throw new HttpException(
                    {
                        error: 'Bad Request',
                        statusCode: 400,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            });
        return this.findById(id);
    }

    async remove(id: number) {
        const removeRes = await this.questionRepository.delete(id);
        if (removeRes.affected === 0)
            throw new NotFoundException(`Question with id:${id} not found`);
    }
}
