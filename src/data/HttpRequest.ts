export class HttpRequest {
    endpoint: string;
    method: string;
    body: string;
    headers: {};

    constructor(endpoint: string, method: string, body: {}) {
        this.endpoint = endpoint;
        this.method = method;
        this.body = JSON.stringify(body);
    }

    sign(token: String) {
        this.headers = {'Content-Type': 'Application/JSON', 'Authorization': token};
    }

}