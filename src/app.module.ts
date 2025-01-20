import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerHttp } from './middleware/logger.middleware';

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
            logging: true
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerHttp).forRoutes('*')
    }
    
 }
