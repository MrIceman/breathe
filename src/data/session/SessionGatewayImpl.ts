import {SessionGateway} from "../../domain/session/SessionGateway";
import {Session} from "./Session";
import {HttpRequest} from "../HttpRequest";
import {HttpService} from "../http/HttpService";
import {SessionResponseMapper} from "../../domain/session/SessionResponseMapper";
import {ErrorResponseMapper} from "../../domain/common/ErrorResponseMapper";
import {HttpRequestFactory} from "../http/HttpRequestFactory";

export class SessionGatewayImpl implements SessionGateway {
    private string;
    ENDPOINT = 'http://localhost:5000/session';

    constructor(private readonly sessionResponseMapper: SessionResponseMapper,
                private readonly httpService: HttpService,
                private readonly errorMapper: ErrorResponseMapper,
                private readonly httpRequestFactory: HttpRequestFactory
    ) {
    }

    createSession(session: Session): Promise<Session> {
        const httpRequest = this.httpRequestFactory.makeCreateSessionRequest(session);
        return new Promise<Session>((resolve, reject) => {
            this.httpService.makeSignedRequest(httpRequest).then((result) => {
                    return this.sessionResponseMapper.mapSession(result);
                }
                , (error) => {
                    reject(this.errorMapper.mapEntity(error));
                });
        })
    };

    getAllSessions(): Promise<Array<Session>> {
        return undefined;
    }

    getSessionById(id: number): Promise<Session> {
        return undefined;
    }

    updateSession(session: Session): Promise<Session> {
        return undefined;
    }

}