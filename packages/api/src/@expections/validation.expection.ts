import { BadRequestException, HttpStatus } from '@nestjs/common';

export interface ValidationTypeError {
    type: string;
    text: string[];
}

export class ValidationException extends BadRequestException {
    constructor(public ValidationErrors: ValidationTypeError[]) {
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            messages: ValidationErrors,
        });
    }
}
