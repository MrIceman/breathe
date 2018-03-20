import {AuthRequest} from "./model/AuthRequest";
import {AuthResponse} from "./model/AuthResponse";

export interface AuthManager {
    tryAutoLogIn(): Promise<boolean>;

    signIn(request: AuthRequest): Promise<AuthResponse>;

    signOut(): Promise<boolean>;

    cacheToken(token: string): Promise<string>;

    createAccount(request: AuthRequest): Promise<AuthResponse>;

    isPersistedTokenAvailable(): Promise<AuthResponse>;
}