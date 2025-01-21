import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerHttp implements NestMiddleware {
    private logger = new Logger('HTTP');
    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(
            `Logging http request ${req.method} ${req.protocol}:/${req.host}${req.url} status:${res.statusCode}`,
        );
        next();
    }
}
