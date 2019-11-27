import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import Constants from './Constants';
import Cell from './Components/Cell';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.boardWidth = Constants.CELL_SIZE * Constants.BOARD_SIZE;
    this.grid = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, index) => {
      return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, index) => {
        return null;
      });
    });
  }

  onPressButton() {
    alert('You tapped the button!')
  };


  onDie = () => {
    Alert.alert('Oh no! Grinch just ruined Christmas!')
  }

  onReveal = (x, y) => {

  }

  renderBoard = () => {
    return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, rowIndex) => {
      let cellList = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, colIndex) => {
        return <Cell
          onDie={this.onDie}
          onReveal={this.onReveal}
          key={colIndex}
          width={Constants.CELL_SIZE}
          height={Constants.CELL_SIZE}
          x={colIndex}
          y={rowIndex}
          ref={(ref) => { this.grid[colIndex][rowIndex] = ref }}
        />
      });

      return (
        <View key={rowIndex} style={{ width: this.boardWidth, height: Constants.CELL_SIZE, flexDirection: 'row' }}>
          {cellList}
        </View >
      )
    });
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>The GrinchSweeper</Text>
        <Button
          onPress={this.onPressButton}
          title="Press Me"
        />
        <Text style={styles.description}>hedsmlksnhvkjhfkjahbscljks</Text>
        <View style={{ width: this.boardWidth, height: this.boardWidth, backgroundColor: '#888888', flexDirection: 'column' }}>
          {this.renderBoard()}
        </View>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D8584'
  },

  title: {
    padding: 10,
    fontSize: 35
  },

  description: {
    padding: 10,
    fontSize: 15,

  }
});
