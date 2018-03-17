export var ActionType;
(function (ActionType) {
    ActionType["ON_REGISTER"] = "register,";
    ActionType["ON_REGISTER_FAILED"] = "register_fail";
    ActionType["ON_REGISTER_SUCCESS"] = "register_success";
    ActionType["ON_LOG_IN"] = "on_log_in";
    ActionType["ON_LOG_IN_FAIL"] = "on_log_in_fail";
    ActionType["ON_LOG_IN_SUCCESS"] = "on_log_in_success";
    ActionType["ON_TOKEN_PERSIST"] = "on_token_persist";
    ActionType["ON_TOKEN_PERSIST_FAIL"] = "on_token_persist_fail";
    ActionType["ON_TOKEN_PERSIST_SUCCESS"] = "on_token_persist_success";
    ActionType["CHECK_TOKEN_PERSISTED"] = "token_persisted";
    ActionType["CHECK_TOKEN_PERSISTED_FAIL"] = "token_persisted_fail";
    ActionType["CHECK_TOKEN_PERSISTED_SUCCESS"] = "token_persisted_success";
    ActionType["START_SESSION"] = "start_session";
    ActionType["ON_FINISH_SESSION"] = "finish_session";
    ActionType["PERSIST_SESSION"] = "persisted_session";
    ActionType["ON_PERSIST_SESSION"] = "on_persisted_session";
})(ActionType || (ActionType = {}));
//# sourceMappingURL=ActionType.js.map