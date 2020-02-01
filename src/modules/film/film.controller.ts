import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { CRUDController } from './../../shared/crud/crud.controller';
import { FilmsService } from './film.service';
import { FilmQueryDTO } from './dto/params.dto';
import { FilmRequestDTO, FilmDTO } from './dto/film.dto';
import { multerOptions } from './../../shared/utils/files.util';

@ApiTags('Films')
@Controller('film')
export class FilmsController extends CRUDController<FilmDTO> {
  constructor(private readonly filmsService: FilmsService) {
    super(filmsService);
  }

  @Get('/')
  public getAll(@Query() params: FilmQueryDTO) {
    return this.filmsService.getFilms(params);
  }

  @Get('/count')
  public countFilms() {
    return this.filmsService.countFilms();
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('posterImgName', multerOptions))
  public async addFilm(@UploadedFile() file, @Body() data: FilmRequestDTO) {
    if (!file) {
      throw new HttpException('Poster image required!', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.filmsService.add({
        ...data,
        posterImgName: file.filename
      });
    } catch (error) {
      if (error.message === '23505' /* Duplicate unique value error code */) {
        throw new HttpException(
          'Duplicated unigue value!',
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException(
          'Unable to save this data!',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
