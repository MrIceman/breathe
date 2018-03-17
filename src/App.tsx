/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {AuthStore, AuthStoreState} from "./app/globals/AuthStore";
import {LoginComponent} from "./app/login/LoginComponent";
import {IceComponent} from "./app/IceComponent";
import {AuthAction} from "./app/globals/AuthAction";
import {Text, View} from "react-native";
import {TabBarBottom, TabNavigator} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";


class App extends Component<{}, AuthStoreState> {
    globalStore: AuthStore;
    action: AuthAction;

    constructor() {
        super({});
        this.globalStore = AuthStore.getInstance(this);
        this.state = this.globalStore.getInitialState();
        this.action = AuthAction.getInstance();
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
