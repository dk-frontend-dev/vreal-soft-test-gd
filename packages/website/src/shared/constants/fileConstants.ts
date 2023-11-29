import {AccessType} from "@prisma/client";

export const enum FileMimeTypes {
    SVG = 'image/svg+xml',
    PNG = 'image/png',
    JPG = 'image/jpeg'
}

export const ONE_MB = 1024 * 1024;

export const FILE_TYPES = Object.values(AccessType);
