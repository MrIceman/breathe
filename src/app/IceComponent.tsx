import * as React from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";

class ListItem extends React.PureComponent<{ selected: boolean, title: string }> {

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
            <TouchableOpacity onPress={() => {
            }}>
                <View>
                    <Text style={{color: textColor}}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export class IceComponent extends React.Component {

    _renderItem = ({item}) => (
        <ListItem
            selected={true}
            title={item}
        />
    );

    render() {
        return (
            <FlatList
                style={{flex: 1}}
                data={['Breath Training', 'Cold Session', 'Stastistics']}
                renderItem={this._renderItem}
            />
        );
    }
}