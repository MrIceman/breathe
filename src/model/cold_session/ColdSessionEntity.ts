import {Entity} from "../entity/Entity";

export class ColdSessionEntity implements Entity {
    constructor(public readonly uuid: string,
                public date: number = 0,
                public duration: number,
                public type: string,
                public notes: string) {
    }

    static empty(): ColdSessionEntity {
        // Use the empty construct if you would like to parse an Entity from JSON
        return new ColdSessionEntity(undefined, undefined,
            undefined, undefined, undefined);
    }

    toJSONString(): string {

        return JSON.stringify({"uuid": this.uuid, "notes": this.notes, "duration": this.duration, "type": this.type});
    }

}