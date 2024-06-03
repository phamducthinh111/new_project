import { diskStorage } from 'multer';
import { extname } from 'path';

export const storageConfig = (folder: string) => diskStorage({
  destination: `uploads/${folder}`,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + extname(file.originalname));
  },
});
