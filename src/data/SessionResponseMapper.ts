import {SessionEntity} from "./session/SessionEntity";

export class SessionResponseMapper {

    constructor() {
    }

    mapSession(data): SessionEntity {
        return new SessionEntity(
            data.id,
            data.id,
            data.createdOn,
            data.amountOfRounds,
            false,
            data.rounds,
            data.notes,
            false
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