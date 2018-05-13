import {Manager} from "../Manager";
import {Session} from "./model/Session";


/**
 * The Session Manager handles all the domain specific logic
 * and calls methods from the data layer (gateway) which gets returned then
 * to the app layer
 */

export interface SessionManager extends Manager {

    /**
     * Creates a Session out of the given parameters.
     * The session will be given an ID each by the persisting backends
     * (local: localId and backend: globalId)
     * @param {number} amountOfRounds
     * @param {boolean} custom
     * @param {Map<number, number>} retentionTimeMap
     * @param {Map<number, number>} amountOfBreathsPerRetention
     * @param {string} notes
     * @returns {Promise<SessionResponse>}
     */
    createAndSaveSession(amountOfRounds: number, custom: boolean, retentionTimeMap: Map<number, number>, amountOfBreathsPerRetention: Map<number, number>,
                         notes: string): Promise<Session>;

    createSessionGlobal(localSession: Session): Promise<Session>;

    getAllSessions(): Promise<Array<Session>>;

    getSessionById(id: number): Promise<Session>;
}
