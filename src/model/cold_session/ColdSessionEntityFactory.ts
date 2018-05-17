import {EntityFactory} from "../EntityFactory";
import {ColdSessionEntity} from "./ColdSessionEntity";

export class ColdSessionEntityFactory extends EntityFactory<ColdSessionEntity> {

    createFromJSON(data): ColdSessionEntity {
        return new ColdSessionEntity(data.uuid, data.createOn, data.duration, data.type, data.notes);
    }

    createFromValues(uuid, duration, type, notes): ColdSessionEntity {
        return new ColdSessionEntity(uuid, 0, duration, type, notes);
    }

}