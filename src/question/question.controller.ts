import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    Put,
    UseGuards,
    Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Role } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Difficulty } from 'src/common/enum/difficulty.enum';
import { FilterQuestionDto } from './dto/filter-question.dto';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @Post()
    @HttpCode(201)
    @UsePipes(ValidationPipe)
    create(@Body() createQuestionDto: CreateQuestionDto) {
        console.log(createQuestionDto);
        
        return this.questionService.create(createQuestionDto);
    }

    @Get()
    @HttpCode(200)
    @Role('ADMIN')
    @UseGuards(RolesGuard)
    findAll() {
        return this.questionService.findAll();
    }

    @Get('/filter?')
    @HttpCode(200)
    findByFilter(
    @Query('points') points: number,
    @Query('difficulty') difficulty: Difficulty,
    ) {
        console.log(points);
        console.log(difficulty);
        "в разработке"
        // return this.questionService.findByFilter(filterQuestionDto)
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
