import { AuthEntity } from "../../model/entity/AuthEntity";
import { HttpRequest } from "../HttpRequest";
import { HttpService } from "../http/HttpService";
export class AuthGatewayImpl {
    signIn(request) {
        return new Promise((resolve, reject) => {
            let httpRequest;
            httpRequest = new HttpRequest('http://localhost:5000/profile/sign_in', 'POST', JSON.stringify({ 'email': request.email, 'password': request.password }));
            HttpService.makeUnsignedRequest(httpRequest).then((http_resolve) => {
                if (http_resolve.error !== undefined) {
                    reject(http_resolve.error);
                }
                let auth = new AuthEntity(http_resolve.token);
                resolve(auth);
            }).catch((http_error) => {
                reject(http_error);
            });
        });
    }
    register(request) {
        return new Promise((resolve, reject) => {
            let httpRequest;
            httpRequest = new HttpRequest('http://localhost:5000/profile/register', 'POST', JSON.stringify({
                'email': request.email,
                'password': request.password,
                'display_name': request.username
            }));
            HttpService.makeUnsignedRequest(httpRequest).then((http_resolve) => {
                if (http_resolve.error !== undefined) {
                    reject(http_resolve.error);
                }
                else {
                    let auth = new AuthEntity(http_resolve.token);
                    resolve(auth);
                }
            }).catch((http_error) => {
                console.warn('AuthGatewayImpl: Error within catch');
                reject(http_error);
            });
        });
    }
    signOut() {
        return new Promise((resolve) => {
            resolve(new AuthEntity(""));
        });
    }
    changePassword(request) {
        //todo
        request.email;
        return undefined;
    }
    deleteUser(request) {
        //todo
        request.email;
        return undefined;
    }
}
//# sourceMappingURL=AuthGatewayImpl.js.map