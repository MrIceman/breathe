import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const style = StyleSheet.create({
    content: {
        flex: 1,
        padding: 8,
        backgroundColor: '#2196F3',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff'
    },
    header: {},

    buttonBox: {
        paddingTop: 16,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    }
});

export class BreathingComponent extends React.Component {

    constructor(props: {}) {
        super(props);
    }

    public update() {};

    render() {
        return <View style={style.content}>
            <View style={style.header}>
                <Text style={style.text}>
                    Do you want to track your Breaths before the retention phase, too?
                </Text>
                <View style={style.buttonBox}>
                    <TouchableOpacity> <Text style={style.buttonText}> No</Text></TouchableOpacity>
                    <TouchableOpacity> <Text style={style.buttonText}> Yes</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    }
}