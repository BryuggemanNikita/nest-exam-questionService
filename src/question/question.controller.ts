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
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Role } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    create(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }

    @Get()
    @HttpCode(200)
    @Role('ADMIN')
    @UseGuards(RolesGuard)
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
