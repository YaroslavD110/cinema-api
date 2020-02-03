import { GetByIdParams } from './../../shared/dto/params.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UploadedFiles,
  Param
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { CRUDController } from './../../shared/crud/crud.controller';
import { FilmsService } from './film.service';
import { FilmQueryDTO } from './dto/params.dto';
import { FilmRequestDTO, FilmDTO } from './dto/film.dto';
import { multerOptions, composeFile } from './../../shared/utils/files.util';

@ApiTags('Films')
@Controller('film')
export class FilmsController extends CRUDController<FilmDTO> {
  constructor(private readonly filmsService: FilmsService) {
    super(filmsService);
  }

  @Get('/')
  public getAll(@Query() params: FilmQueryDTO) {
    return this.filmsService.getAllFilms(params);
  }

  @Get('/:id/update')
  public async updateFilmData(@Param() params: GetByIdParams) {
    const updatedEntity = await this.filmsService.updateDataAboutFilm(
      params.id
    );

    if (!updatedEntity) {
      throw new HttpException('Film not found!', HttpStatus.NOT_FOUND);
    }

    return updatedEntity;
  }

  @Get('/minimized')
  public getMinimized(@Query() params: FilmQueryDTO) {
    return this.filmsService.getMinimizedFilms(params);
  }

  @Get('/count')
  public countFilms() {
    return this.filmsService.countFilms();
  }

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'posterImg', maxCount: 1 },
        { name: 'screenshots', maxCount: 10 }
      ],
      multerOptions
    )
  )
  public async addFilm(@UploadedFiles() files, @Body() data: FilmRequestDTO) {
    try {
      return await this.filmsService.add({
        ...data,
        screenshots: files.screenshots?.map(composeFile),
        posterImg: Array.isArray(files.posterImg)
          ? composeFile(files.posterImg[0])
          : undefined
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
