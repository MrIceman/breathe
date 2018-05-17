import {ColdSessionGateway} from "../../domain/cold_session/ColdSessionGateway";
import {ColdSessionRequest} from "../../model/request/ColdSessionRequest";
import {ColdSessionEntity} from "../../model/cold_session/ColdSessionEntity";
import {HttpService} from "../http/HttpService";
import {ErrorResponseMapper} from "../../domain/common/ErrorResponseMapper";
import {ColdSessionResponseMapper} from "./ColdSessionResponseMapper";

export class ColdSessionGatewayImpl implements ColdSessionGateway {

    constructor(private readonly sessionResponseMapper: ColdSessionResponseMapper,
                private readonly httpService: HttpService,
                private readonly errorMapper: ErrorResponseMapper,
    ) {
    }

    createSession(httpRequest: ColdSessionRequest): Promise<ColdSessionEntity> {
        return new Promise<ColdSessionEntity>((resolve, reject) => {
            this.httpService.makeSignedRequest(httpRequest).then((result) => {
                    const entity = this.sessionResponseMapper.parseEntity(result.data);
                    resolve(entity);
                }
                , (error) => {
                    reject(this.errorMapper.mapEntity(error));
                });
        });
    }

    getAllSessions(): Promise<Array<ColdSessionEntity>> {
        return undefined;
    }

    getSessionById(id: string): Promise<ColdSessionEntity> {
        return undefined;
    }

    updateSession(session: ColdSessionRequest): Promise<ColdSessionEntity> {
        return undefined;
    }

}