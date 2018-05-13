import {Entity} from "../../model/entity/Entity";
import {RoundEntity} from "./RoundEntity";

export class SessionEntity implements Entity {

    constructor(public readonly id: number = Date.now(),
                public globalId: number, // ID from the Backend, -1 when not initialized yet
                public date: number = Date.now(),
                public amountOfRounds: number,
                public custom: boolean,
                public rounds: Array<RoundEntity>,
                public notes: string,
                public inMemoryOnly: boolean = true) {
    }

    static empty(): SessionEntity {
        // Use the empty construct if you would like to parse an Entity from JSON
        return new SessionEntity(undefined, undefined, undefined, undefined, undefined,
            undefined, undefined);
    }

    toJSONString(): string {

        return JSON.stringify(this);
    }

    fromJSONString(json: string): SessionEntity {
        return JSON.parse(json);
    }

}