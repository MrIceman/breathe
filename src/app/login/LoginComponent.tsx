import * as React from "react";
import {Text, View} from "react-native";
import {Button, FormInput, FormLabel} from "react-native-elements";
import {LoginStateModel, LoginStore} from "./LoginStore";
import {AuthAction} from "../globals/AuthAction";

export class LoginComponent extends React.Component<{}, LoginStateModel> {
    store: LoginStore;
    action: AuthAction;
    count: number = 0;

    constructor(props: {}) {
        super(props);
        this.store = new LoginStore(this);
        this.state = this.store.state;
    }

    componentDidMount() {
        this.action = AuthAction.getInstance();
    }

    getForm(): JSX.Element {
        return <View style={{width: 200}}><FormLabel style={{borderColor: 'white'}}>What's your
            name? {this.count}</FormLabel>
            <FormInput
                placeholder={'Email'}
                onChangeText={(text) => {
                    this.setState({userEmail: text.toLowerCase()})
                }}
                value={this.state.userEmail}/>

            <FormInput
                placeholder={'Password'}
                onChangeText={(text) => {
                    this.setState({userPassword: text.toLowerCase()})
                }}
                value={this.state.userPassword}/>

            <Button title={'Sign In'} onPress={() => {
                this.action.trySignIn(this.state.userEmail, this.state.userPassword);
            }}/>
        </View>;
    }

    getContent(): JSX.Element {
        return <View>{this.getForm()}
            <Text style={{fontSize: 10, fontWeight: 'bold'}}>{this.state.message}</Text>
        </View>;
    }

    render() {
        this.count++;
        return <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center'}}>
            {this.getContent()}
        </View>;
    }
}