import {Entity} from "./Entity";

export class ErrorEntity implements Entity{
    code: number;

    constructor(code: number) {
        this.code = code;
    }
}