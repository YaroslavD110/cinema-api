import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

(async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);

    const swaggerOptions = new DocumentBuilder()
      .setTitle('Cinema API')
      .setDescription('API documentation for test Cinema API project')
      .setVersion('1.0')
      .build();

    app.use(helmet());

    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        disableErrorMessages: process.env.NODE_ENV === 'production'
      })
    );

    SwaggerModule.setup(
      '/api/docs',
      app,
      SwaggerModule.createDocument(app, swaggerOptions)
    );

    await app.listen(PORT);

    logger.log(`Server is running on port ${PORT}`);
  } catch (error) {
    logger.error('Filed to startup the Server!', error.trace);
  }
})();
