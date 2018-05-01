import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {TimerCircleComponent} from "../practice/Timer/TimerCircleComponent";
import {BreathingController} from "./BreathingController";
import {ManagerFactory} from "../../domain/ManagerFactory";

const style = StyleSheet.create({
    content: {
        flex: 1,
        padding: 8,
        backgroundColor: '#2196F3',
        flexDirection: 'column',
        justifyContent: 'space-around',
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

export interface BreathingComponentState {
    trackBreaths: boolean,
    start: boolean,
    currentRound: 0,
    sessionDone: boolean,
    sessionSaveFailed: boolean,
    sessionSaved: boolean,
    results: string[]
}

export class BreathingComponent extends React.Component<{}, BreathingComponentState> {
    private controller: BreathingController;

    constructor(props: {}) {
        super(props);
        this.state = this.getDefaultState();
        this.controller = new BreathingController(this, ManagerFactory.buildSessionManger());
        this.updateState = this.updateState.bind(this);
    }

    public getDefaultState(): BreathingComponentState {
        return {
            trackBreaths: false,
            start: false,
            currentRound: 0,
            sessionDone: false,
            sessionSaveFailed: false,
            sessionSaved: false,
            results: []
        }
    }

    public updateState(state: BreathingComponentState) {
        //this.setState(state);
        alert('Hello dude');

    };

    public getState(): BreathingComponentState {
        return this.state;
    }

    private startTimer() {
    }

    private stopTimer(time: number) {
        // alert(`You made it to ${time} seconds`);
        this.controller.addRound(time);
    }

    private getResults() {
        return <View>
            {this.state.results.map((text) => {
                return <Text>text</Text>;
            })}
        </View>

    }


    render() {
        return <View style={style.content}>
            {!this.state.start && <View style={style.header}>
                <Text style={style.text}>
                    Do you want to track your Breaths before the retention phase, too?
                </Text>
                <View style={style.buttonBox}>
                    <TouchableOpacity onPress={() => {
                        this.controller.launchWithoutTrackingBreaths()
                    }}> <Text
                        style={style.buttonText}> No</Text></TouchableOpacity>
                    <TouchableOpacity> <Text style={style.buttonText}> Yes</Text></TouchableOpacity>
                </View>
            </View>
            }
            {this.state.start &&
            <View>
                {this.getResults()}
                <TimerCircleComponent onStartCallBack={() => this.startTimer} onStopCallBack={this.stopTimer}/>
            </View>
            }
        </View>
    }
}