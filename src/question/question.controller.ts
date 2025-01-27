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
import { FilterQuestionDto } from './dto/filter-question.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Question } from './entities/question.entity';

@ApiTags('Взаимодействие с вопросами')
@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @ApiOperation({ summary: 'Создание вопроса' })
    @ApiResponse({ status: 201, type: Question })
    @Post()
    @HttpCode(201)
    @UsePipes(ValidationPipe)
    create(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }

    @ApiOperation({ summary: 'Получение всех существующих сущностей `Question`' })
    @ApiResponse({ status: 200, type: [Question] })
    @Get()
    @HttpCode(200)
    @Role('ADMIN')
    @UseGuards(RolesGuard)
    findAll() {
        return this.questionService.findAll();
    }

    @ApiOperation({ summary: 'Получение вопросов по фильтру' })
    @ApiResponse({ status: 200, type: [Question] })
    @Get('filter')
    @HttpCode(200)
    findByFilter(@Query() filterQuestionDto: FilterQuestionDto) {
        return this.questionService.findByFilter(filterQuestionDto);
    }

    @ApiOperation({ summary: 'Получение вопроса по id' })
    @ApiResponse({ status: 200, type: Question })
    @Get(':id')
    @HttpCode(200)
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.questionService.findById(id);
    }

    @ApiOperation({ summary: 'Обновление данных о вопросе по id' })
    @ApiResponse({ status: 200, type: Question })
    @Put(':id')
    @HttpCode(200)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateQuestionDto: UpdateQuestionDto,
    ) {
        return this.questionService.update(id, updateQuestionDto);
    }

    @ApiOperation({ summary: 'Удаление вопроса по id' })
    @ApiResponse({ status: 204 })
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.questionService.remove(id);
    }
}
