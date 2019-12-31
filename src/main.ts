import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

(async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const port = process.env.PORT || 8080;
    const app = await NestFactory.create(AppModule);

    app.use(helmet());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        disableErrorMessages: process.env.NODE_ENV === 'production'
      })
    );

    await app.listen(port);

    logger.log(`> Server is running on port ${port}`);
  } catch (error) {
    logger.error('> Filed to startup the Server!', error.trace);
  }
})();
