import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmsModule } from './films/films.module';
import { LabelsModule } from './labels/labels.module';
import { ExceptionsFilter } from './shared/exceptions.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'admin',
      database: 'cinema',
      entities: [__dirname + '/entities/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: false
    }),
    FilmsModule,
    LabelsModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter
    }
  ]
})
export class AppModule {}
