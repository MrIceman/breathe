import {SessionRequest} from "./model/SessionRequest";

export class SessionRequestMapper {

    makeSessionRequest(date: number,
                       amountOfRounds: number,
                       custom: boolean,
                       retentionTimeMap: Map<number, number>,
                       amountOfBreathsPreRetention: Map<number, number>,
                       notes: string,
                       globalId?: number): SessionRequest {

        return new SessionRequest(
            date,
            amountOfRounds,
            custom,
            retentionTimeMap,
            amountOfBreathsPreRetention,
            notes,
            globalId
        );
    }
}