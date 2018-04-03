import React, { Component } from 'react';
import { AuthController } from "./app/globals/AuthController";
import { IceComponent } from "./app/IceComponent";
import { AuthAction } from "./app/globals/AuthAction";
import { StyleSheet, Text, View } from "react-native";
import { TabBarBottom, TabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GlobalStore } from "./app/globals/BreathStore";
class App extends Component {
    constructor(props) {
        super(props);
        this.styles = StyleSheet.create({
            container: {
                flex: 1,
            },
            navBar: {
                height: 55,
                backgroundColor: 'white',
                elevation: 3,
                paddingHorizontal: 15,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
            },
            titleText: {
                fontSize: 13,
                fontWeight: 'bold',
            },
            rightNavIcons: {}
        });
        this.action = new AuthAction();
        this.controller = new AuthController(this.action, this, GlobalStore.getInstance());
        this.state = this.controller.getInitialState();
    }
    componentDidMount() {
        this.action.isTokenPersisted();
    }
    render() {
        return React.createElement(View, { style: this.styles.container },
            React.createElement(View, { style: this.styles.navBar },
                React.createElement(View, null),
                React.createElement(Text, { style: this.styles.titleText }, "Breathe"),
                React.createElement(View, { style: this.styles.rightNavIcons },
                    React.createElement(Ionicons, { name: 'ios-more', size: 25, color: 'black' }))));
    }
}
// Routing
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