import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainWindow } from "./MainWindow";
export const styles = StyleSheet.create({
    menuTitle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fontSize: 23,
        fontWeight: '800',
        width: 300,
        color: '#000',
        textAlign: 'center',
        margin: 8
    }
});
class MenuItem extends React.PureComponent {
    render() {
        return (React.createElement(TouchableOpacity, { onPress: () => {
            } },
            React.createElement(Text, { style: styles.menuTitle }, this.props.title)));
    }
}
export class IceComponent extends React.Component {
    render() {
        return (React.createElement(MainWindow, null,
            React.createElement(View, { style: {
                    flex: 1,
                    justifyContent: 'center',
                    paddingTop: 20,
                    flexDirection: 'column',
                    alignItems: 'center'
                } },
                React.createElement(MenuItem, { title: 'Breathing' }),
                React.createElement(MenuItem, { title: 'Cold Exposure' }))));
    }
}
//# sourceMappingURL=IceComponent.js.map