import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DirectorService } from './director.service';
import { CRUDController } from './../../shared/crud/crud.controller';

@ApiTags('Directors')
@Controller('director')
export class DirectorController extends CRUDController {
  constructor(private readonly directorService: DirectorService) {
    super(directorService);
  }
}
