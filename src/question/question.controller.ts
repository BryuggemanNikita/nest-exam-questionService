import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    create(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }

    
    @Get()
    @HttpCode(200)
    findAll() {
        return this.questionService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.questionService.findById(id);
    }

    @Put(':id')
    @HttpCode(200)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateQuestionDto: UpdateQuestionDto,
    ) {
        return this.questionService.update(id, updateQuestionDto);
    }

    @Delete(':id')
    @HttpCode(200)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.questionService.remove(id);
    }
}
