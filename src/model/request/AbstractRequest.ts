export abstract class AbstractRequest {
    data: Map<String, any>;

    constructor() {
        this.data = new Map();
    }

    value(key: string): any {
        return this.data.get(key);
    }
}