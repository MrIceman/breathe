import {RoundEntity} from "../../../model/session/RoundEntity";
import {SessionRequest} from "../../../model/request/SessionRequest";
import {SessionEntity} from "../../../model/session/SessionEntity";
import {Session} from "./Session";

export class SessionFactory {

    public createNewSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes,): Session {
        const timestamp = Date.now();
        return new Session(timestamp, amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes,);
    }

    public makeSessionRequest(session: SessionEntity): SessionRequest {
        return new SessionRequest(session.uuid, session.rounds, session.notes, 'http://localhost:5000/session/create', 'POST');
    }

    public parseEntityToModel(entity: SessionEntity): Session {
        return new Session(
            entity.date,
            entity.rounds.length,
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

}
