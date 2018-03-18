import {Entity} from "../../model/entity/Entity";

export class Session implements Entity {

    constructor(public readonly id: number,
                public date: number,
                public amountOfRounds: number,
                public custom: boolean,
                public retentionTimeMap: Map<number, number>,
                public amountOfBreathsPreRetention: Map<number, number>,
                public notes: string) {
    }

}