import {Session} from "./Session";
import {RoundEntity} from "../../../data/session/RoundEntity";
import {SessionRequest} from "../../../model/request/SessionRequest";
import {SessionEntity} from "../../../data/session/SessionEntity";

export class SessionFactory {

    public createNewSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes,): Session {
        const timestamp = Date.now();
        return new Session(timestamp, amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes,);
    }

    public makeSessionRequest(session: Session): SessionRequest {
        const timestamp = Date.now();
        return new SessionRequest(timestamp,
            -1,
            timestamp,
            session.amountOfRounds,
            session.custom,
            this.createNewRoundsArray(session.amountOfBreathsPreRetention, session.retentionTimeMap),
            session.notes,);
    }

    public parseEntityToModel(entity: SessionEntity) {
        return new Session(
            entity.date,
            entity.amountOfRounds,
            false,
            this.getBreathsMap(entity.rounds),
            this.getRetentionMap(entity.rounds),
            entity.notes
        );
    }

    private getBreathsMap(data: Array<RoundEntity>): Map<number, number> {
        const rounds: Map<number, number> = new Map();
        data.forEach((value, index) => rounds.set(index, value.breathes))
        return rounds;
    }

    private getRetentionMap(data: Array<RoundEntity>): Map<number, number> {
        const rounds: Map<number, number> = new Map();
        data.forEach((value, index) => rounds.set(index, value.retentionTime))
        return rounds;
    }

    public createNewRoundsArray(breaths: Map<number, number>, retentions: Map<number, number>): Array<RoundEntity> {
        const rounds: Array<RoundEntity> = [];
        breaths.forEach((breathValue, breathKey) => {
            retentions.forEach((retentionValue, retentionKey) => {
                rounds.push(new RoundEntity(breathValue, retentionValue));
            })
        });
        return rounds;
    }
}
