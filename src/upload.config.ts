import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: 'D:/uploads', // Diretório onde os arquivos serão salvos
    filename: (req, file, cb) => {
      const filename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, filename);
    },
  }),
};
