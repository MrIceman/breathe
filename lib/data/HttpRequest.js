export class HttpRequest {
    constructor(endpoint, method, body) {
        this.endpoint = endpoint;
        this.method = method;
        this.body = JSON.stringify(body);
    }
    sign(token) {
        this.headers = { 'Content-Type': 'Application/JSON', 'Authorization': token };
    }
}
//# sourceMappingURL=HttpRequest.js.map