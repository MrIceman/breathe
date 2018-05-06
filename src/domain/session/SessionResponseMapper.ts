import {Session} from "./model/Session";

export class SessionResponseMapper {

    mapSession(data): Session {
        return new Session(
            data.date,
            data.amountOfRounds,
            data.custom,
            this.getMap(data.retentionTimeMap),
            this.getMap(data.amountsOfBreathsPerRound),
            data.notes,
            data.localId,
            data.globalId
        );
    }


    private getMap(data: {}) {
        const map = new Map();
        for (const key in data) {
            map.set(Number(key), data[key]);
        }
        return map;
    }
}