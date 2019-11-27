import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


export default class Cell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            revealed: false,
            isGrinch: Math.random() < 0.2,
            neighbours: null
        }
    }

    onReveal = () => {
        this.setState({
            revealed: true
        })
    }

    render() {
        const { width, height } = this.props;

        if (!this.state.revealed) {
            return (
                <TouchableOpacity onPress={this.onReveal}>
                    <View style={[styles.cell, { width: width, height: height }]}>

                    </View>
                </TouchableOpacity>
            )
        } else {
            let content = null;

            return (
                <View style={[styles.cellRevealed, { width: width, height: height }]}></View>
            )
        }


    }
}

const styles = StyleSheet.create({
    cell: {
        backgroundColor: '#bdbdbd',
        borderWidth: 3,
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#7d7d7d',
        borderBottomColor: '#7d7d7d'
    },
    cellRevealed: {
        backgroundColor: "#bdbdbd",
        borderWidth: 1,
        borderColer: "#7d7d7d"
    }
})