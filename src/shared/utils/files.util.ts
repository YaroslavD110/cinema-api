import { extname } from 'path';
import * as uuid from 'uuid/v4';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

import {
  MulterFuncType,
  FilterCallbackType,
  RenameCallbackType,
  MulterFileType
} from '../interfaces/files.interface';
import { FileDTO } from './../dto/file.dto';
import { Image } from './../../entities/image.entity';

export const imagesFileFilter: MulterFuncType<FilterCallbackType> = (
  _,
  file,
  callback
) => {
  const ext = extname(file.originalname);

  callback(null, ['.jpeg', '.jpg', '.png'].includes(ext));
};

export const imagesRename: MulterFuncType<RenameCallbackType> = (
  _,
  file,
  callback
) => {
  const ext = extname(file.originalname);
  callback(null, `${uuid()}${ext}`);
};

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: process.env.UPLOADED_FILES_PATH,
    filename: imagesRename
  }),
  fileFilter: imagesFileFilter
};

export const composeFile = (file?: MulterFileType): FileDTO => {
  if (!file) return null;

  return {
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size
  };
};

export const createImageEntity = (file: FileDTO): Image => {
  const ext = extname(file.filename);
  const image = new Image();

  image.id = file.filename.replace(ext, '');
  image.extension = ext;
  image.mimetype = file.mimetype;
  image.size = file.size;

  return image;
};
