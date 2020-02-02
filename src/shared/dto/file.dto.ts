import { IsInt, IsNotEmpty } from 'class-validator';

export class FileDTO {
  @IsNotEmpty()
  public filename: string;

  @IsNotEmpty()
  public mimetype: string;

  @IsInt()
  @IsNotEmpty()
  public size: number;
}
