import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default class Cell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { width, height } = this.props;

        return (
            <View style={[styles.cell, { width: width, height: height }]}>

            </View>


        )
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
    }
})