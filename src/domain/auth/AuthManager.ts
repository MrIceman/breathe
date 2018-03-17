import {AuthRequest} from "./model/AuthRequest";
import {AuthResponse} from "./model/AuthResponse";
import {AuthEntity} from "../../model/entity/AuthEntity";

export interface AuthManager {
    tryAutoLogIn(): Promise<boolean>;

    signIn(request: AuthRequest): Promise<AuthResponse>;

    signOut(): Promise<AuthEntity>;

    cacheToken(token: string): Promise<boolean>;

    createAccount(request: AuthRequest): Promise<AuthResponse>;

    isPersistedTokenAvailable(): Promise<AuthResponse>;
}