export class AbstractRequest {
    constructor() {
        this.data = new Map();
    }
    value(key) {
        return this.data.get(key);
    }
}
//# sourceMappingURL=AbstractRequest.js.map