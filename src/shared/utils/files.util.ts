import { extname } from 'path';
import * as uuid from 'uuid/v4';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export type RenameCallbackType = (error: Error | null, name: string) => void;
export type FilterCallbackType = (
  error: Error | null,
  acceptFile: boolean
) => void;
export type MulterFuncType<CallbackType> = (
  req: any,
  file: {
    /** Field name specified in the form */
    fieldname: string;
    /** Name of the file on the user's computer */
    originalname: string;
    /** Encoding type of the file */
    encoding: string;
    /** Mime type of the file */
    mimetype: string;
    /** Size of the file in bytes */
    size: number;
    /** The folder to which the file has been saved (DiskStorage) */
    destination: string;
    /** The name of the file within the destination (DiskStorage) */
    filename: string;
    /** Location of the uploaded file (DiskStorage) */
    path: string;
    /** A Buffer of the entire file (MemoryStorage) */
    buffer: Buffer;
  },
  callback: CallbackType
) => void;

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
  const name = uuid();

  callback(null, `${name}${ext}`);
};

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: process.env.UPLOADED_FILES_PATH,
    filename: imagesRename
  }),
  fileFilter: imagesFileFilter
};
