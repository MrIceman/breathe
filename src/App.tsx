import React, {Component} from 'react';
import {AuthController, AuthState} from "./app/globals/AuthController";
import {IceComponent} from "./app/IceComponent";
import {AuthAction} from "./app/globals/AuthAction";
import {StyleSheet, Text, View} from "react-native";
import {TabBarBottom, TabNavigator} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import {GlobalStore} from "./app/globals/BreathStore";


class App extends Component<{}, AuthState> {
    controller: AuthController;
    action: AuthAction;
    styles;

    constructor(props: {}) {
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
        return <View style={this.styles.container}>
            <View style={this.styles.navBar}>
                <View/>
                <Text style={this.styles.titleText}>Breathe</Text>
                <View style={this.styles.rightNavIcons}>
                    <Ionicons name={'ios-more'} size={25} color={'black'}/>
                </View>
            </View>
        </View>
    }
}

// Routing
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
