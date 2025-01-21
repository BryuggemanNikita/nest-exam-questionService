import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        @Inject('winston')
        private readonly logger: Logger,
    ) {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();

        this.logger.info(
            `${req.method} ${req.originalUrl} ${status} err: ${exception.message}`,
        );

        const errDetails = exception.getResponse();
        res.status(status).json({
            timeStamp: new Date().toString(),
            path: req.url,
            errDetails,
        });
    }
}
