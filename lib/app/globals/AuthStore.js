import { AbstractStore } from "../common/AbstractStore";
import { ActionType } from "../common/ActionType";
export class AuthStore extends AbstractStore {
    constructor(component) {
        super(component);
        this.state = this.getInitialState();
    }
    ;
    static getInstance(component) {
        if (this.instance == null) {
            this.instance = new AuthStore(component);
        }
        else if (this.instance.component !== component)
            this.instance.component = component;
        return this.instance;
    }
    receive(actionType, response) {
        this.state = this.getInitialState();
        switch (actionType) {
            case (ActionType.CHECK_TOKEN_PERSISTED_SUCCESS):
                console.warn('Received response: ' + response);
                this.state.isTokenPersisted = true;
                this.state.isAuthenticated = true;
                this.state.checkedIfTokenIsPersisted = true;
                this.updateState();
                break;
            case (ActionType.CHECK_TOKEN_PERSISTED_FAIL):
                this.state.checkedIfTokenIsPersisted = true;
                this.updateState();
                break;
        }
    }
    getInitialState() {
        return {
            isTokenPersisted: false,
            authenticationFailed: false,
            isAuthenticated: false,
            checkedIfTokenIsPersisted: false
        };
    }
}
//# sourceMappingURL=AuthStore.js.map