import {ColdSessionEntity} from "../../model/cold_session/ColdSessionEntity";

export class ColdSessionResponseMapper {

    parseEntity(data): ColdSessionEntity {
        return new ColdSessionEntity(
            data.uuid,
            new Date(data.createdOn).getTime(),
            data.duration,
            data.type,
            data.notes,
        );
    }

}