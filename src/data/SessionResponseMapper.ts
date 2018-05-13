import {SessionEntity} from "./session/SessionEntity";

export class SessionResponseMapper {

    constructor() {
    }

    parseSessionEntity(data): SessionEntity {
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

    public parseSessionEntityArray(data): Array<SessionEntity> {
        return data.map((session) => this.parseSessionEntity(session));
    }

    private getMap(data: {}) {
        const map = new Map();
        for (const key in data) {
            map.set(Number(key), data[key]);
        }
        return map;
    }
}