import {FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe} from '@nestjs/common';
import {ValidationException} from '@/@expections/validation.expection';

interface ParseFilePipeOptions {
  fileType: string[];
  maxSize: number;
  isRequired?: boolean;
}

@Injectable()
export class CustomParseFilePipe extends ParseFilePipe {
  constructor({fileType, maxSize, isRequired = true}: ParseFilePipeOptions) {
    const fileTypesString = `.(${fileType.join('|')})`;

    super({
      validators: [new FileTypeValidator({fileType: fileTypesString}), new MaxFileSizeValidator({maxSize})],
      fileIsRequired: isRequired,
      exceptionFactory: (error: string) => {
        return new ValidationException([{type: 'file', text: [error]}]);
      }
    });
  }
}
