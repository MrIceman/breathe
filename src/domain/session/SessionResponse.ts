import {Response} from "../../model/response/Response";

export class SessionResponse implements Response {
    constructor(public readonly id: number,
                public readonly date: number,
                public readonly amountOfRounds: number,
                public readonly custom: boolean,
                public readonly retentionTimeMap: Map<number, number>,
                public readonly amountOfBreathsPreRetention: Map<number, number>,
                public readonly notes: string) {
    }

}