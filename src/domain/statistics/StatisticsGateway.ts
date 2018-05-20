import {SessionEntity} from "../../model/session/SessionEntity";
import {ColdSessionEntity} from "../../model/cold_session/ColdSessionEntity";
import {UserReportEntity} from "../../model/statistics/UserReportEntity";

export interface StatisticsGateway {
    getAllBreathingSessions(): Promise<SessionEntity>;
    getAllColdSessions(): Promise<ColdSessionEntity>;
    getUserStatistics(): Promise<UserReportEntity>;

}