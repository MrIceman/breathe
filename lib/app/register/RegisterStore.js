import { AbstractStore } from "../common/AbstractStore";
import { ActionType } from "../common/ActionType";
export class RegisterStore extends AbstractStore {
    constructor(component) {
        super(component);
        this.state = this.getInitialState();
        this.component.setState(this.state);
    }
    receive(actionType, _response) {
        switch (actionType) {
            case ActionType.ON_REGISTER:
                this.state = Object.assign({}, this.state, { inProgress: true });
                break;
            case ActionType.ON_REGISTER_SUCCESS:
                this.state = Object.assign({}, this.state, { inProgress: false, registerComplete: true, registerFailed: false });
                break;
            case ActionType.ON_REGISTER_FAILED:
                this.state = Object.assign({}, this.state, { inProgress: false, registerComplete: true, registerFailed: true });
                break;
        }
        this.updateState();
    }
    getInitialState() {
        return {
            validEmail: false,
            validPassword: false,
            validDisplayName: false,
            emailInput: '',
            passwordInput: '',
            displayName: '',
            inProgress: false,
            registerFailed: false,
            registerComplete: false
        };
    }
}
//# sourceMappingURL=RegisterStore.js.map