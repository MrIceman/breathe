import React from 'react';
import {PracticeComponent} from "./app/practice/PracticeComponent";
import {StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";
import {HomeComponent} from "./app/home/HomeComponent";
import {BreathingComponent} from "./app/session/BreathingComponent";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatisticsComponent} from "./app/statistics/StatisticsComponent";

const PracticeStack = StackNavigator({
    Practice: {screen: PracticeComponent},
    Breathing: {screen: BreathingComponent}
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#1976D2',
        },
        title: 'Practice',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

const StatisticsStack = StackNavigator({
    Statistics: {screen: StatisticsComponent},
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#1976D2',
        },
        title: 'Statistics',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
});

const HomeStack = StackNavigator({
    Home: {screen: HomeComponent},
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#1976D2',
        },
        title: 'Home',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

// Routing
export default TabNavigator(
    {
        Home: {
            screen: HomeStack,
        },
        Practice: {
            screen: PracticeStack,
        },
        Statistics: {
            screen: StatisticsStack,
        },
        Community: {
            screen: PracticeComponent,
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName: string;
                if (routeName === 'Home') {
                    iconName = `ios-clock-outline`;
                } else if (routeName === 'Practice') {
                    iconName = `ios-stopwatch${focused ? '' : '-outline'}`;
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
        animationEnabled: true,
        swipeEnabled: true,
    }
);
