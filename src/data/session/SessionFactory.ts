import {Session} from "./Session";

export class SessionFactory {

    public createNewSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes,): Session {
        return new Session(undefined, undefined, undefined, custom, amountOfRounds, retentionTimeMap, amountOfBreathsPerRetention,
            amountOfBreathsPerRetention, notes,);
    }
}