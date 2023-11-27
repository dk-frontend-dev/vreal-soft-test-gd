import {Injectable, ValidationPipe} from "@nestjs/common";
import {ValidationException} from "@/@expections/validation.expection";

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
    constructor() {
        super({
            exceptionFactory: (errors): ValidationException => {
                const messages = [];
                errors.forEach((err) => {
                    if (!err.children.length) {
                        messages.push({
                            type: err.property,
                            text: Object.values(err.constraints),
                        });
                        return;
                    }

                    err.children.forEach((childErr) => {
                        messages.push({
                            type: childErr.property,
                            text: Object.values(childErr.constraints),
                        });
                    });
                });
                
                return new ValidationException(messages);
            },
        });
    }
}
