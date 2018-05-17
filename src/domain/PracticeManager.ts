import {Entity} from "../model/entity/Entity";
import {Manager} from "./Manager";

export interface PracticeManager<ENTITY extends Entity> extends Manager {
    getAllSessions(): Promise<Array<ENTITY>>;

    getSessionById(id: number): Promise<ENTITY>;

    createSessionGlobal(localSession: ENTITY): Promise<ENTITY>;

}