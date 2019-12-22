import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmsModule } from './films/films.module';
import { LabelsModule } from './labels/labels.module';

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
  ]
})
export class AppModule {}
