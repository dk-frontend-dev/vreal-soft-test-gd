import {AccessType} from "@/shared/models/file.model.ts";

export const enum FileMimeTypes {
  SVG = 'image/svg+xml',
  PNG = 'image/png',
  JPG = 'image/jpeg',
  MP4 = 'video/mp4'
}

export const ONE_MB = 1024 * 1024;

export const VIDEO_FORMATS = ['.mp4'];

export const FILE_TYPES = Object.values(AccessType);
