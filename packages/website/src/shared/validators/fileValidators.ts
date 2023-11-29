import {validationErrors} from '@/shared/constants/validationErrors.ts';

export const validateFileSize = (maxFileSize: number, isRequired = true): any => {
  return (fileList: FileList) => {
    if (!isRequired && !fileList) return true;

    const file = fileList[0];
    return file.size <= maxFileSize || validationErrors.maxFileSize;
  };
};
