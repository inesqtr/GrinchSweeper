import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
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


    revealAllCells = () => {
        if (this.state.revealed) {
            return;
        }

        this.setState({
            revealed: true
        })
    }



    //when clicking the cell
    onReveal = (playerInitiated) => {
        const winner = this.props.getWinner();

        if (this.state.revealed) {
            return;
        }

        if (!playerInitiated && this.state.isGrinch) {
            return;
        }


        //change state of cell
        this.setState({
            revealed: true
            //to not exceed the maximum call stack
        }, () => {
            if (winner) {
                this.props.onWin();
            //if there's a grinch on the cell
            } else if (this.state.isGrinch) {
                this.props.onDie();
            } else {
                //if it's not a grinch
                this.props.onReveal(this.props.x, this.props.y);
            }
        });
    }


    reset = () => {
        this.setState({
            revealed: false,
            isGrinch: Math.random() < 0.2,
            neighbours: null
        })
    }


    render() {
        const { width, height } = this.props;
        const { revealed, isGrinch, neighbours } = this.state;
        if (!revealed) {
            return (

                //create opacity when you click a cell and make it functional
                <TouchableOpacity onPress={this.onReveal}>
                    <View style={[styles.cell, { width: width, height: height }]}>

                    </View>
                </TouchableOpacity>
            )
        } else {
            let content = null;

            //show a grinch on the cell
            if (isGrinch) {
                content = (
                    <Image source={Images.grinch} style={{ width: width / 1.1, height: height / 1.1 }} />
                )
            } else if (neighbours) {
                //show how many grinches are in the adjacent cells
                content = (
                    <Text>{neighbours}</Text>
                )
            }

            return (
                //show empty cell
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
        borderColor: "#7d7d7d",
        alignItems: 'center',
        justifyContent: 'center'
    }
})