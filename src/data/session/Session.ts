import {Entity} from "../../model/entity/Entity";

export class Session implements Entity {

    constructor(public readonly id: number = Date.now(),
                public globalId: number, // ID from the Backend, -1 when not initialized yet
                public date: number = Date.now(),
                public amountOfRounds: number,
                public custom: boolean,
                public retentionTimeMap: Map<number, number>,
                public amountOfBreathsPreRetention: Map<number, number>,
                public notes: string,
                public inMemoryOnly: boolean = true) {
    }

    static empty(): Session {
        // Use the empty construct if you would like to parse an Entity from JSON
        return new Session(undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            undefined, undefined);
    }

    toJSONString(): string {

        return JSON.stringify(this);
    }

    fromJSONString(json: string): Session {
        return JSON.parse(json);
    }

}