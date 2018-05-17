import {PracticeManager} from "../PracticeManager";
import {ColdSessionEntity} from "../../model/cold_session/ColdSessionEntity";

export interface ColdSessionManager extends PracticeManager<ColdSessionEntity> {
    createAndSaveSession(duration: number, type: string, notes: string): Promise<ColdSessionEntity>;
}