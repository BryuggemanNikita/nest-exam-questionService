import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { DifficultyModule } from 'src/difficulty/difficulty.module';

@Module({
    imports: [TypeOrmModule.forFeature([Question]), DifficultyModule],
    exports: [TypeOrmModule],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule {}
