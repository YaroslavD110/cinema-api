import {
  Controller,
  UseInterceptors,
  HttpStatus,
  HttpException,
  UploadedFile,
  Body,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { DirectorService } from './director.service';
import { CRUDController } from './../../shared/crud/crud.controller';
import { multerOptions } from './../../shared/utils/files.util';
import { DirectorRequestDTO, DirectorDTO } from './dto/director.dto';

@ApiTags('Directors')
@Controller('director')
export class DirectorController extends CRUDController<DirectorDTO> {
  constructor(private readonly directorService: DirectorService) {
    super(directorService);
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('posterImgName', multerOptions))
  public async add(@UploadedFile() file, @Body() data: DirectorRequestDTO) {
    try {
      return await this.directorService.add({
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
