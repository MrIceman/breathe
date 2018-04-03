import * as React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
class ListItem extends React.PureComponent {
    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (React.createElement(TouchableOpacity, { onPress: () => {
            } },
            React.createElement(View, null,
                React.createElement(Text, { style: { color: textColor } }, this.props.title))));
    }
}
export class IceComponent extends React.Component {
    constructor() {
        super(...arguments);
        this._renderItem = ({ item }) => (React.createElement(ListItem, { selected: true, title: item }));
    }
    render() {
        return (React.createElement(FlatList, { style: { flex: 1 }, data: ['Breath Training', 'Cold Session', 'Stastistics'], renderItem: this._renderItem }));
    }
}
//# sourceMappingURL=IceComponent.js.map