import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';


async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger()
    });
    const port = process.env.PORT || 3000;
    await app.listen(port, () => {
        console.log(`server started on port ${port}`);
    });
}
bootstrap();
