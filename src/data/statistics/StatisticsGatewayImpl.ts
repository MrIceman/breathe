import {StatisticsGateway} from "../../domain/statistics/StatisticsGateway";
import {SessionEntity} from "../../model/session/SessionEntity";
import {ColdSessionEntity} from "../../model/cold_session/ColdSessionEntity";
import {UserReportEntity} from "../../model/statistics/UserReportEntity";

export class StatisticsGatewayImpl implements StatisticsGateway {
    getAllBreathingSessions(): Promise<SessionEntity> {
        return undefined;
    }

    getAllColdSessions(): Promise<ColdSessionEntity> {
        return undefined;
    }

    getUserStatistics(): Promise<UserReportEntity> {
        return undefined;
    }

}