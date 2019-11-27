import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Images from '../assets/Images';


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
        });

        if (this.state.isGrinch) {
            this.props.onDie();
        } else {
            this.props.onReveal(this.props.x, this.props.y);
        }
    }

    render() {
        const { width, height } = this.props;
        const { revealed, isGrinch } = this.state;

        if (!revealed) {
            return (
                <TouchableOpacity onPress={this.onReveal}>
                    <View style={[styles.cell, { width: width, height: height }]}>

                    </View>
                </TouchableOpacity>
            )
        } else {
            let content = null;
            if (isGrinch) {
                content = (
                    <Image source={Images.grinch} style={{ width: width / 2, height: height / 2 }} />
                )
            }

            return (
                <View style={[styles.cellRevealed, { width: width, height: height }]}>
                    {content}
                </View>
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
        borderColer: "#7d7d7d",
        alignItems: 'center',
        justifyContent: 'center'
    }
})