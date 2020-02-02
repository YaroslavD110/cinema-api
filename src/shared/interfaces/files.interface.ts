// Multer types
export type RenameCallbackType = (error: Error | null, name: string) => void;

export type MulterFileType = {
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
};

export type FilterCallbackType = (
  error: Error | null,
  acceptFile: boolean
) => void;

export type MulterFuncType<CallbackType> = (
  req: any,
  file: MulterFileType,
  callback: CallbackType
) => void;
