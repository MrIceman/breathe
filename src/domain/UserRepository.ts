export interface InMemoryRepository {
    isAuthTokenPersisted(): Promise<boolean>;

    getAuthToken(): Promise<string>;

    refreshAuthToken(token: string): Promise<string>;

    insertSession(session: {}): Promise<boolean>;

    getAllSessions(): Promise<Array<{}>>;

    invalidateSession(): Promise<boolean>;

}