import React from 'react';
import {IceComponent} from "./app/IceComponent";
import {TabBarBottom, TabNavigator} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import {HomeComponent} from "./app/home/HomeComponent";

// Routing
export default TabNavigator(
    {
        Home: {
            screen: HomeComponent,
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
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                } else if (routeName === 'Session') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor}/>
            },

        }),
        tabBarOptions: {
            activeBackgroundColor: '#1976D2',
            activeTintColor: '#ffffff',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);
