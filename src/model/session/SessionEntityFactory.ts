import {EntityFactory} from "../EntityFactory";
import {UUIDBuilder} from "../../data/repository/UUIDBuilder";
import {SessionEntity} from "./SessionEntity";
import {RoundEntity} from "./RoundEntity";

export class SessionEntityFactory extends EntityFactory<SessionEntity> {

    constructor(private readonly uuidBuilder: UUIDBuilder) {
        super();
        this.createNewRoundsArray = this.createNewRoundsArray.bind(this);
    }

    createFromJSON(data): SessionEntity {
        return undefined;
    }

    createFromValues(notes: string, breaths: Map<number, number>, retentions: Map<number, number>, date: number): SessionEntity {
        return new SessionEntity(this.uuidBuilder.buildUUID(),
            date,
            this.createNewRoundsArray(breaths, retentions),
            notes)
    }

    public createNewRoundsArray(breaths: Map<number, number>, retentions: Map<number, number>): Array<RoundEntity> {
        const rounds: Array<RoundEntity> = [];
        console.log('Creatng new rounds array');
        retentions.forEach((retentionValue, retentionKey) => {
            rounds.push(new RoundEntity(retentionKey, 0, retentionValue));
            console.log('pushed round entity');
        });
        return rounds;
    }

}