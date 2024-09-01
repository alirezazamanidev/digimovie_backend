import { BadRequestException } from "@nestjs/common";



export class ValidationException extends BadRequestException {

    constructor(public errors:object[] | string[]){
        super();
        this.stack=super.stack;
    }
}