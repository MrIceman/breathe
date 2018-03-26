import { ActionType } from "../common/ActionType";
export class LoginStore {
    receive(actionType, _response) {
        switch (actionType) {
            case ActionType.ON_LOG_IN_SUCCESS:
                this.state = Object.assign({}, this.getInitialState(), { isAuthInProgress: false, isLoggedIn: true, message: 'Login Successful' });
                break;
            case ActionType.ON_LOG_IN:
                this.state = Object.assign({}, this.getInitialState(), { isAuthInProgress: true, message: 'Please wait while sign in is processing' });
                break;
            case ActionType.ON_LOG_IN_FAIL:
                this.state = Object.assign({}, this.getInitialState(), { isAuthInProgress: false, logInFailed: true, isLoggedIn: false, message: 'Login Failed' });
        }
    }
    getInitialState() {
        return {
            userEmail: '',
            userPassword: '',
            isAuthInProgress: false,
            isLoggedIn: false,
            logInFailed: false,
            message: ''
        };
    }
}
//# sourceMappingURL=LoginStore.js.map