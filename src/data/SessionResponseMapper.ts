import {SessionEntity} from "../model/session/SessionEntity";
import {RoundEntity} from "../model/session/RoundEntity";

export class SessionResponseMapper {

    constructor() {
    }

    parseSessionEntity(data): SessionEntity {
        return new SessionEntity(
            data.uuid,
            new Date(data.createdOn).getTime(),
            this.parseRoundEntity(data.rounds),
            data.notes,
        );
    }

    private parseRoundEntity(data: any): Array<RoundEntity> {
        /*
        [{
           "breathes": 0,
            "createdOn": "Wed, 16 May 2018 22:05:41 GMT",
            "id": 15,
            "inhaleHoldDuration": 0,
            "retentionTime": 2,
             "totalTime": 0,
             "roundOrder": 1
           }
         ],
         */
        const rounds = [];
        for (const roundData of data) {
            const entity = new RoundEntity(
                roundData.roundOrder,
                roundData.breathes,
                roundData.retentionTime,
                roundData.inhaleHoldDuration,
                roundData.totalTime,
                new Date(roundData.createdOn).getTime()
            );
            rounds.push(entity);
        }

        return rounds;
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