/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import { AuthController } from "./app/globals/AuthController";
import { LoginComponent } from "./app/login/LoginComponent";
import { IceComponent } from "./app/IceComponent";
import { AuthAction } from "./app/globals/AuthAction";
import { Text, View } from "react-native";
import { TabBarBottom, TabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GlobalStore } from "./app/globals/BreathStore";
class App extends Component {
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
            view = (this.state.isAuthenticated ? React.createElement(IceComponent, null) : React.createElement(LoginComponent, null));
        }
        else {
            view = React.createElement(View, { style: {
                    flex: 1,
                    backgroundColor: 'skyblue',
                    justifyContent: 'center',
                    alignItems: 'center'
                } },
                React.createElement(Text, null, "Loading.."));
        }
        return view;
    }
}
export default TabNavigator({
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
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            }
            else if (routeName === 'Settings') {
                iconName = `ios-options${focused ? '' : '-outline'}`;
            }
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return React.createElement(Ionicons, { name: iconName, size: 25, color: tintColor });
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
});
//# sourceMappingURL=App.js.map