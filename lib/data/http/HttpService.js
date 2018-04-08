import { HttpResponse } from "../HttpResponse";
import { LocalRepository } from "../repository/LocalRepository";
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
                        if (result.token !== undefined)
                            response.token = result.token;
                        if (result.Error !== undefined)
                            response.error = result.Error;
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
            LocalRepository.getInstance().isAuthTokenPersisted().then((result) => {
                if (result) {
                    LocalRepository.getInstance().getAuthToken().then((token) => {
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