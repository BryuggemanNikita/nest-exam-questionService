import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DifficultyService } from './difficulty.service';
import { CreateDifficultyDto } from './dto/create-difficulty.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Difficulty } from './entities/difficulty.entity';

@ApiTags('Взаимодействие со сложностью вопроса')
@Controller('difficulty')
export class DifficultyController {
  constructor(private readonly difficultyService: DifficultyService) { }

  @ApiOperation({ summary: 'Создание сущности `Difficulty`' })
  @ApiResponse({ status: 201, type: Difficulty })
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  create(@Body() createDifficultyDto: CreateDifficultyDto) {
    return this.difficultyService.create(createDifficultyDto);
  }

  @ApiOperation({ summary: 'Получение всех существующих сущностей `Difficulty`' })
  @ApiResponse({ status: 200, type: [Difficulty] })
  @HttpCode(200)
  @Get()
  findAll() {
    return this.difficultyService.findAll();
  }

  @ApiOperation({ summary: 'Получение сущности `Difficulty` по ключу' })
  @ApiResponse({ status: 200, type: Difficulty })
  @Get(':key')
  @HttpCode(200)
  findByKey(@Param('key') key: string) {
    return this.difficultyService.findByKey(key);
  }

  @ApiOperation({ summary: 'Удаление сущности `Difficulty` по id' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.difficultyService.remove(id);
  }
}
