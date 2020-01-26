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

import { ActorRequestDTO } from './dto/actor.dto';
import { ActorService } from './actor.service';
import { CRUDController } from '../../shared/crud/crud.controller';
import { multerOptions } from '../../shared/utils/files.util';

@ApiTags('Actors')
@Controller('actor')
export class ActorController extends CRUDController {
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
      throw new HttpException('Invalid data!', HttpStatus.BAD_REQUEST);
    }
  }
}
