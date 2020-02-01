import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { ActorRequestDTO, ActorDTO } from './dto/actor.dto';
import { ActorService } from './actor.service';
import { CRUDController } from '../../shared/crud/crud.controller';
import { multerOptions } from '../../shared/utils/files.util';

@ApiTags('Actors')
@Controller('actor')
export class ActorController extends CRUDController<ActorDTO> {
  constructor(private readonly actorService: ActorService) {
    super(actorService);
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('posterImgName', multerOptions))
  public async add(@UploadedFile() file, @Body() data: ActorRequestDTO) {
    try {
      return await this.actorService.add({
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
