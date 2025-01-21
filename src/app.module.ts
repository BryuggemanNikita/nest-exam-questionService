import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerHttp } from './common/middleware/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception/filters/http-exception.filter';
import { AuthGuard } from './common/guards/auth.guard';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { OtherExceptionFilter } from './common/exception/filters/other-exception.filter';

@Module({
    imports: [
        QuestionModule,
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST,
            port: Number(process.env.PG_PORT),
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB,
            entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true,
        }),
        WinstonModule.forRoot({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    dirname: __dirname + './../log/debug/',
                    filename: 'debug.log',
                    level: 'debug',
                }),
                new winston.transports.File({
                    dirname: __dirname + './../log/info/',
                    filename: 'info.log',
                    level: 'info',
                }),
                new winston.transports.File({
                    dirname: __dirname + './../log/other/',
                    filename: 'warn.log',
                    level: 'warn',
                }),
            ],
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: OtherExceptionFilter,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerHttp).forRoutes('*');
    }
}
