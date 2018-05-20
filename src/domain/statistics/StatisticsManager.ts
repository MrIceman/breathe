import {Manager} from "../Manager";
import {SessionEntity} from "../../model/session/SessionEntity";
import {ColdSessionEntity} from "../../model/cold_session/ColdSessionEntity";
import {SessionReportEntity} from "../../model/statistics/SessionReportEntity";
import {UserReportEntity} from "../../model/statistics/UserReportEntity";

export interface StatisticsManager extends Manager {
    getAllBreathingSessions(): Promise<Array<SessionEntity>>;

    getAllColdSessions(): Promise<Array<ColdSessionEntity>>;

    filterBreathingSessionByDate(date: Date): Promise<Array<SessionEntity>>;

    filterColdSessionByDate(date: Date): Promise<Array<ColdSessionEntity>>;

    getAnalyticalDataForBreathingSession(session: SessionEntity): Promise<SessionReportEntity>;

    getAnalyticalDataForColdSession(session: ColdSessionEntity): Promise<SessionReportEntity>;

    getAnalyticalDataFoUser(): Promise<UserReportEntity>;

}