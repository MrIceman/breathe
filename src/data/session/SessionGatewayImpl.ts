import {SessionGateway} from "../../domain/session/SessionGateway";
import {SessionEntity} from "./SessionEntity";
import {HttpService} from "../http/HttpService";
import {SessionResponseMapper} from "../SessionResponseMapper";
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

    createSession(session: SessionEntity): Promise<SessionEntity> {
        const httpRequest = this.httpRequestFactory.makeCreateSessionRequest(session);
        return new Promise<SessionEntity>((resolve, reject) => {
            this.httpService.makeSignedRequest(httpRequest).then((result) => {
                    return this.sessionResponseMapper.mapSession(result);
                }
                , (error) => {
                    reject(this.errorMapper.mapEntity(error));
                });
        })
    };

    getAllSessions(): Promise<Array<SessionEntity>> {
        return undefined;
    }

    getSessionById(id: number): Promise<SessionEntity> {
        return undefined;
    }

    updateSession(session: SessionEntity): Promise<SessionEntity> {
        return undefined;
    }

}