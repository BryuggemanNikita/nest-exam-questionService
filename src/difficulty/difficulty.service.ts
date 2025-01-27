import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateDifficultyDto } from './dto/create-difficulty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Difficulty } from './entities/difficulty.entity';
import { Repository } from 'typeorm';
import { waitForDebugger } from 'inspector';
import { IDifficulty } from './inteface/difficulty.interface';
import { NotFoundError } from 'rxjs';

@Injectable()
export class DifficultyService {
    constructor(
        @InjectRepository(Difficulty)
        private readonly difficultyRepository: Repository<Difficulty>,
    ) {}

    async create(
        createDifficultyDto: CreateDifficultyDto,
    ): Promise<IDifficulty> {
        const difficulty =
            this.difficultyRepository.create(createDifficultyDto);

        await this.difficultyRepository.save(difficulty).catch(() => {
            throw new BadRequestException(
                `Difficult with this key: ${difficulty.key} is already exists`,
            );
        });
        return difficulty;
    }

    async findAll(): Promise<IDifficulty[]> {
        return await this.difficultyRepository.find();
    }

    async findByKey(key: string): Promise<IDifficulty> {
        const difficulty = await this.difficultyRepository.findOneBy({ key });
        if (!difficulty) {
            throw new NotFoundException(
                `Difficulty with this key: ${key} is not found`,
            );
        }
        return difficulty;
    }

    async remove(id: number): Promise<void> {
        const removeRes = await this.difficultyRepository.delete({ id });
        if (removeRes.affected === 0) {
            throw new NotFoundException(
                `Difficulty with this id: ${id} is not found`,
            );
        }
    }
}
