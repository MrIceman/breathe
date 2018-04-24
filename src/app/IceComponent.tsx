import * as React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MainWindow} from "./MainWindow";
import Ionicons from "react-native-vector-icons/Ionicons";

export const styles = StyleSheet.create({
    menuTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
    },
    menuItem: {
        backgroundColor: '#2196F3',
        height: 200,
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: '#fff',
        borderStyle: 'dotted',
        borderWidth: 1,
        margin: 8
    },
    menu: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class MenuItem extends React.PureComponent<{ title: string, icon: string }> {
    render() {
        return (
            <TouchableOpacity onPress={() => {
            }}>
                <View style={styles.menuItem}>
                    <Ionicons name={this.props.icon} size={55} color={'#fff'}/>
                    <Text style={styles.menuTitle}>
                        {this.props.title}
                    </Text></View>
            </TouchableOpacity>
        );
    }
}

export class IceComponent extends React.Component {

    render() {
        return (
            <MainWindow>
                <View style={styles.menu}>
                    <MenuItem title={'Breathing'} icon={'ios-clock-outline'}/>
                    <MenuItem title={'Cold Exposure'} icon={'ios-snow-outline'}/>
                </View>
            </MainWindow>
        );
    }
}