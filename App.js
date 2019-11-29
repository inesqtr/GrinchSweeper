import React, { Component } from 'react';
import Snow from 'react-native-snow';
import { StyleSheet, View, Text, Alert, SafeAreaView, TouchableHighlight, Modal, Image } from 'react-native';
import Constants from './Constants';
import Cell from './Components/Cell';
import Images from './assets/Images';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    }

    //initialize grid 10*10
    this.boardWidth = Constants.CELL_SIZE * Constants.BOARD_SIZE;
    this.grid = Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, index) => {
      return Array.apply(null, Array(Constants.BOARD_SIZE)).map((el, index) => {
        return null;
      });
    });
  }


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  onDie = () => {
    Alert.alert('Oh no! Grinch succeded and you just destroyed your Christmas!')
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
      for (let j = 0; j < Constants.BOARD_SIZE; j++) {
        this.grid[i][j].revealAllCells();
      }
    }
  }

  onWin = () => {
    Alert.alert('Yey! Congratulations! You just saved Christmas!')
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
      for (let j = 0; j < Constants.BOARD_SIZE; j++) {
        this.grid[i][j].revealAllCells();
      }
    }
  }


  getWinner = () => {
    for (let i = 0; i < Constants.BOARD_SIZE; i++) {
      for (let j = 0; j < Constants.BOARD_SIZE; j++) {
        if (!this.grid[i][j].state.revealed && !this.grid[i][j].state.isGrinch) return false;
        if (!this.grid[i][j].state.revealed && this.grid[i][j].state.isGrinch) return true;
      }
    } 
    return;
  }

  revealNeighbours = (x, y) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (x + i >= 0 && x + i <= Constants.BOARD_SIZE - 1 && y + j >= 0 && y + j <= Constants.BOARD_SIZE - 1)
          this.grid[x + i][y + j].onReveal();
      }
    }
  }


  //click on cell and shows neighbours
  onReveal = (x, y) => {
    let neighbours = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        //to not overflow grid
        if (x + i >= 0 && x + i <= Constants.BOARD_SIZE - 1 && y + j >= 0 && y + j <= Constants.BOARD_SIZE - 1)
          //count how many grinches are on the adjacent cells
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
          onWin={this.onWin}
          getWinner={this.getWinner}
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
      
      <SafeAreaView style={styles.container}>
        <Snow />
        <Image source={Images.grinch} style={{ width: 90, height: 90 }} />

        <Text style={styles.title}>The GrinchSweeper</Text>
        <Text style={styles.subTitle}>- Save your Christmas -</Text>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >


          <View style={styles.modal}>
            <Text style={styles.modalText}>Grinch is trying to ruin your Christmas, so he planted some small mines next to Santa's gifts storage. </Text>
            <Text style={styles.modalText}>Click anywhere on the board to start playing. The numbers show how many Grinch mines are adjacent to any given cell.</Text>
            <Text style={styles.modalText}>Try to sweep the little grinches, to save your Christmas.</Text>
            <Text style={styles.modalText}>If you step on one, all the gifts will explode...</Text>

            <TouchableHighlight
              style={styles.modalButton}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                CLOSE
              </Text>
            </TouchableHighlight>
          </View>

        </Modal>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>
            INSTRUCTIONS
          </Text>
        </TouchableHighlight>

        <View style={{ width: this.boardWidth, height: this.boardWidth, backgroundColor: '#888888', flexDirection: 'column' }}>
          {this.renderBoard()}
        </View>

        <TouchableHighlight onPress={this.resetGame} title="Play Again" style={styles.button}>
          <Text style={{ color: 'black', fontWeight: 'bold' }} >PLAY AGAIN</Text>
        </TouchableHighlight>

      </SafeAreaView>

    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#046306'
  },

  title: {
    //paddingTop: 25,
    fontSize: 35,
    color: '#EDF1DB',
    fontWeight: 'bold',
  },

  subTitle: {
    padding: 10,
    fontSize: 20,
    color: 'white'
  },

  button: {
    margin: 25,
    padding: 10,
    backgroundColor: '#ffdbc5',
    borderRadius: 10,
  },

  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdbc5',
    padding: 5
  },

  modalText: {
    padding: 10,
    fontSize: 20,
    textAlign: 'justify'
  },

  modalButton: {
    backgroundColor: 'black',
    marginTop: 25,
    padding: 10,
    borderRadius: 10
  },




});
