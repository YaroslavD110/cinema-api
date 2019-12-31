import { IsInt, IsNotEmpty, Min, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseIntTransform } from '../data.transform';

export class GetByIdParams {
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @Transform(parseIntTransform)
  id: number;
}

export class GetBySlugParams {
  @IsString()
  @IsNotEmpty()
  slug: string;
}
