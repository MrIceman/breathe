export interface InMemoryRepository {
    isAuthTokenPersisted(): Promise<boolean>;

    getAuthToken(): Promise<string>;

    refreshAuthToken(token: string): Promise<boolean>;

    insertSession(session: {}): Promise<boolean>;

    getAllSessions(): Promise<Array<{}>>;

}