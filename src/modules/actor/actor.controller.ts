import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ActorService } from './actor.service';
import { CRUDController } from '../../shared/crud/crud.controller';

@ApiTags('Actors')
@Controller('actor')
export class ActorController extends CRUDController {
  constructor(private readonly actorService: ActorService) {
    super(actorService);
  }
}
