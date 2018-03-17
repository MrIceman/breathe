import { HttpResponse } from "../HttpResponse";
import { LocalStorage } from "../repository/LocalStorage";
export class HttpService {
    static makeUnsignedRequest(request) {
        return new Promise((resolve, reject) => {
            try {
                fetch(request.endpoint, {
                    method: request.method,
                    body: request.body,
                    headers: { 'Content-Type': 'Application/JSON' }
                }).then((httpResult) => {
                    let response = new HttpResponse();
                    httpResult.json().then((result) => {
                        response.token = result.token;
                        httpResult.toString();
                        resolve(response);
                    });
                }).catch((httpError) => {
                    console.warn('HttpService: Error with fetch request!');
                    reject(httpError);
                });
            }
            catch (error) {
                console.warn(error);
            }
        });
    }
    static makeSignedRequest(request) {
        return new Promise((resolve, reject) => {
            //getting the JWT Token
            LocalStorage.getInstance().isAuthTokenPersisted().then((result) => {
                if (result) {
                    LocalStorage.getInstance().getAuthToken().then((token) => {
                        request.sign(token);
                        fetch(request.endpoint, {
                            method: request.method,
                            body: request.body,
                            headers: request.headers
                        }).then((httpResult) => {
                            let response = new HttpResponse();
                            httpResult.json().then((result) => {
                                response.token = result.token;
                                httpResult.toString();
                                resolve(response);
                            });
                        }).catch((httpError) => {
                            reject(httpError);
                        });
                    });
                }
            });
        });
    }
}
//# sourceMappingURL=HttpService.js.map