import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Question } from './question/entities/question.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST,
            port: Number(process.env.PG_PORT),
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB,
            entities: [__dirname + '/**/*.entity']
        }),
        QuestionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
