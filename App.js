import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import Constants from './Constants';
import Cell from './Components/Cell';

export default class App extends Component {
  constructor(props) {
    super(props);

    //create grid
    this.boardWidth = Constants.CELL_SIZE * Constants.BOARD_SIZE;
    this.grid = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, index) => {
      return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, index) => {
        return null;
      });
    });
  }

  onPressButton() {
    Alert.alert('You tapped the button!')
  };


  onDie = () => {
    Alert.alert('Oh no! Grinch just ruined Christmas!')
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
      for (let j = 0; j < Constants.BOARD_SIZE; j++) {
        this.grid[i][j].revealAllCells();
      }
    }
  }

  revealNeighbours = (x, y) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (x + i >= 0 && x + i <= Constants.BOARD_SIZE - 1 && y + j >= 0 && y + j <= Constants.BOARD_SIZE - 1)
          this.grid[x + i][y + j].onReveal();
      }
    }
  }

  //click on cell and shows
  onReveal = (x, y) => {
    let neighbours = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        //to not overflow grid
        if (x + i >= 0 && x + i <= Constants.BOARD_SIZE - 1 && y + j >= 0 && y + j <= Constants.BOARD_SIZE - 1)
          if (this.grid[x + i][y + j].state.isGrinch) {
            neighbours++;
          }
      }
    }

    if (neighbours) {
      this.grid[x][y].setState({
        neighbours: neighbours
      })
    } else {
      this.revealNeighbours(x, y);
    }

  }


  //function to show grid
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

  resetGame = () => {
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
      for (let j = 0; j < Constants.BOARD_SIZE; j++) {
        this.grid[i][j].reset();
      }
    }
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
        <Button onPress={this.resetGame} title="Play Again" />
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
