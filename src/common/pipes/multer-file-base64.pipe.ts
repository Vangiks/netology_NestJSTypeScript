import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class MulterFileBase64Pipe implements PipeTransform {
  transform(files: Array<Express.Multer.File>, metadata: ArgumentMetadata) {
    if (files.length) {
      return files.map((file) => file.buffer.toString('base64'));
    }
    return files;
  }
}
