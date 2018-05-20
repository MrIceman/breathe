import {StatisticsManager} from "../StatisticsManager";
import {SessionEntity} from "../../../model/session/SessionEntity";
import {ColdSessionEntity} from "../../../model/cold_session/ColdSessionEntity";
import {UserReportEntity} from "../../../model/statistics/UserReportEntity";
import {SessionReportEntity} from "../../../model/statistics/SessionReportEntity";

export class StatisticsManagerImpl implements StatisticsManager {

    filterBreathingSessionByDate(date: Date): Promise<Array<SessionEntity>> {
        return undefined;
    }

    filterColdSessionByDate(date: Date): Promise<Array<ColdSessionEntity>> {
        return undefined;
    }

    getAllBreathingSessions(): Promise<Array<SessionEntity>> {
        return undefined;
    }

    getAllColdSessions(): Promise<Array<ColdSessionEntity>> {
        return undefined;
    }

    getAnalyticalDataFoUser(): Promise<UserReportEntity> {
        return undefined;
    }

    getAnalyticalDataForBreathingSession(session: SessionEntity): Promise<SessionReportEntity> {
        return undefined;
    }

    getAnalyticalDataForColdSession(session: ColdSessionEntity): Promise<SessionReportEntity> {
        return undefined;
    }

}