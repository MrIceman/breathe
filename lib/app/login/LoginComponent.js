import * as React from "react";
import { Text, View } from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";
import { LoginStore } from "./LoginStore";
import { AuthAction } from "../globals/AuthAction";
export class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.count = 0;
        this.store = new LoginStore(this);
        this.state = this.store.state;
    }
    componentDidMount() {
        this.action = AuthAction.getInstance();
    }
    getForm() {
        return React.createElement(View, { style: { width: 200 } },
            React.createElement(FormLabel, { style: { borderColor: 'white' } },
                "What's your name? ",
                this.count),
            React.createElement(FormInput, { placeholder: 'Email', onChangeText: (text) => {
                    this.setState({ userEmail: text.toLowerCase() });
                }, value: this.state.userEmail }),
            React.createElement(FormInput, { placeholder: 'Password', onChangeText: (text) => {
                    this.setState({ userPassword: text.toLowerCase() });
                }, value: this.state.userPassword }),
            React.createElement(Button, { title: 'Sign In', onPress: () => {
                    this.action.trySignIn(this.state.userEmail, this.state.userPassword);
                } }));
    }
    getContent() {
        return React.createElement(View, null,
            this.getForm(),
            React.createElement(Text, { style: { fontSize: 10, fontWeight: 'bold' } }, this.state.message));
    }
    render() {
        this.count++;
        return React.createElement(View, { style: { flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' } }, this.getContent());
    }
}
//# sourceMappingURL=LoginComponent.js.map