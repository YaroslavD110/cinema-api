import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

(async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const port = process.env.PORT || 8080;
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    await app.listen(port);

    logger.log(`> Server is running on port ${port}`);
  } catch (error) {
    logger.error('> Filed to startup the Server!', error.trace);
  }
})();
