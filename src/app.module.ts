import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { FilmsModule } from './modules/film/film.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActorModule } from './modules/actor/actor.module';
import { CountryModule } from './modules/country/country.module';
import { GenreModule } from './modules/genre/genre.module';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ExceptionsFilter } from './shared/exceptions.filter';
import { DirectorModule } from './modules/director/director.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/entities/**/*.entity.{ts,js}'],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development'
    }),
    AuthModule,
    UserModule,
    ActorModule,
    CountryModule,
    FilmsModule,
    GenreModule,
    DirectorModule
  ],
  controllers: [AppController],
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
