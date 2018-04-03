import {Session} from "./Session";

export class SessionFactory {

    public createNewSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes,): Session {
        const timestamp = Date.now();
        return new Session(timestamp, -1, timestamp, amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes,);
    }
}