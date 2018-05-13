export class SessionRequest {

    constructor(public readonly id: number = Date.now(),
                public globalId: number, // ID from the Backend, -1 when not initialized yet
                public date: number = Date.now(),
                public amountOfRounds: number,
                public custom: boolean,
                public rounds: Array<{ breathes: number, retentionTime: number, inhaleHoldDuration: number }>,
                public notes: string) {
    }

    static empty(): SessionRequest {
        // Use the empty construct if you would like to parse an Entity from JSON
        return new SessionRequest(undefined, undefined, undefined, undefined, undefined,
            undefined, undefined);
    }

    toJSONString(): string {

        return JSON.stringify(this);
    }

    fromJSONString(json: string): SessionRequest {
        return JSON.parse(json);
    }

}