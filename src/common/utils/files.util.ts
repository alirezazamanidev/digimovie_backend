import { Request } from "express";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

export const createFileRoute = (name: string, type: string) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDay();
  
    return `./public/uploads/${name}/${type}/${year}/${month}/${day}`;
  };

  export const checkFileType=(
    file: Express.Multer.File,
    fileFormatList: string[],
  ): boolean=> {
    return fileFormatList.includes(file.mimetype);
  }

  export const createUrlForSaveToDb = (file: Express.Multer.File) => {
    const dir = `${file.destination}/${file.filename}`;
    return dir.substring(8);
  };
  export function deleteFileInPublic(fileAddress: string) {
    if (fileAddress) {
      const pathFile = join(__dirname, '..', '..', '..', 'public', fileAddress);
      if (existsSync(pathFile)) unlinkSync(pathFile);
    }
  }
  export function deleteFilesInPublic(req: Request) {
    if (req.file) {
      deleteFileInPublic(req.file.path.substring(7));
    } else if (req.files) {
      let files: any = Object.values(req.files);
  
      files = files.flat(2);
  
      for (let file of files) {
        deleteFileInPublic(file.path.substring(7));
      }
    }
  }