import * as React from "react";
import { Text, View } from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";
import { AuthAction } from "../globals/AuthAction";
import { ManagerFactory } from "../../domain/ManagerFactory";
export class RegisterComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.count = 0;
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.action = new AuthAction(ManagerFactory.buildAuthManager());
    }
    getForm() {
        return React.createElement(View, { style: { width: 200 } },
            React.createElement(FormLabel, { style: { borderColor: 'white' } },
                "What's your name? ",
                this.count),
            React.createElement(FormInput, { placeholder: 'Email', onChangeText: (text) => {
                    this.setState({ emailInput: text.toLowerCase() });
                }, value: this.state.emailInput }),
            React.createElement(FormInput, { placeholder: 'Display Name', onChangeText: (text) => {
                    this.setState({ displayName: text.toLowerCase() });
                }, value: this.state.displayName }),
            React.createElement(FormInput, { placeholder: 'Password', onChangeText: (text) => {
                    this.setState({ passwordInput: text.toLowerCase() });
                }, value: this.state.passwordInput }),
            React.createElement(Button, { title: 'Sign In', onPress: () => {
                    this.action.register(this.state.emailInput, this.state.passwordInput, this.state.displayName);
                } }));
    }
    getContent() {
        return React.createElement(View, null,
            this.getForm(),
            React.createElement(Text, { style: { fontSize: 10, fontWeight: 'bold' } }, "Please Sign Up"));
    }
    render() {
        this.count++;
        return React.createElement(View, { style: { flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' } }, this.getContent());
    }
}
//# sourceMappingURL=RegisterComponent.js.map