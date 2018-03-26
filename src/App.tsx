/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {AuthController, AuthState} from "./app/globals/AuthController";
import {LoginComponent} from "./app/login/LoginComponent";
import {IceComponent} from "./app/IceComponent";
import {AuthAction} from "./app/globals/AuthAction";
import {Text, View} from "react-native";
import {TabBarBottom, TabNavigator} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import {GlobalStore} from "./app/globals/BreathStore";


class App extends Component<{}, AuthState> {
    controller: AuthController;
    action: AuthAction;

    constructor() {
        super({});
        this.state = this.controller.getInitialState();
        this.action = new AuthAction();

        this.controller = new AuthController(this.action, this, GlobalStore.getInstance());
    }

    componentDidMount() {
        this.action.isTokenPersisted();
    }

    render() {
        let view;

        if (this.state.checkedIfTokenIsPersisted) {
            console.warn('CheckedIfToken persisted is fucking true');
            view = (this.state.isAuthenticated ? <IceComponent/> : <LoginComponent/>);
        } else {
            view = <View style={{
                flex: 1,
                backgroundColor: 'skyblue',
                justifyContent: 'center',
                alignItems: 'center'
            }}><Text>Loading..</Text></View>
        }
        return view;
    }
}

export default TabNavigator(
    {
        Home: {
            screen: App,
        },
        Session: {
            screen: IceComponent,
        },
        Statistics: {
            screen: IceComponent,
        },
        Community: {
            screen: IceComponent,
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName: string;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor}/>
            },

        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);
