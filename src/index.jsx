import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Game from './components/Game.jsx';
import GameStatus from './components/GameStatus.jsx';


 

  /**************************
  *      HELPER METHODS     *
  **************************/

  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   * @returns {number}
  */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  function getCellContents(row, col) {
    return _board[row][col];
  }
  /**
   * Appends text to the debug panel.
   * @param {string} message The message to add to debug panel.
   * @return {undefined}
  */
 function updatePlayerInfo(props) {
   return <GameStatus text={props} />
 }

  /**
   * Determines location of a piece.
   * @param {string} piece The name of the piece to locate. 
   * @return {object} position The Row/Col position of piece.
  */
  function getPosition(piece) {
    var position = {'row': 0, 'col': 0};
    for(var row = 0; row < 4; row++) {
      for(var col = 0; col < 3; col++) {
        if(_board[row][col] === piece) {
          position.row = row;
          position.col = col;
        }
      }
    }

    return position; 
  }

  /**
   * Determines if a piece is on the board.
   * @param {object} board The configuration to test.
   * @param {string} piece The piece to search for.
   * @returns {boolean} found Whether the piece was found.
  */
  function isPieceOnBoard(board, piece) {
    var found = false;
    for(var row = 0; row < 4; row++) {
      for(var col = 0; col < 3; col++) {
        if(board[row][col] === piece) {
          found = true;
        }
      }
    }

    return found;
  }
  
let forestLion = {
    name: 'playerLion',
    owner: 1,
    moveDirections: [
        { row: -1, col: 0  }, // North
        { row: 1,  col: 0  }, // South
        { row: 0,  col: -1 }, // West
        { row: 0,  col: 1  }, // East
        { row: -1, col: -1 }, // Northwest
        { row: 1,  col: -1 }, // Southwest
        { row: -1, col: 1  }, // Northeast
        { row: 1,  col: 1  } // Southeast
      ],
      location: [3, 1],
      automove: [-1, -1],
      active: false,
      isCaptured: false,
      isUnderCheck: false,
      reachedOpp: false

    };
  
  let forestChick = {
    name: 'playerChick',
    owner: 1,
    moveDirections: [
        { row: -1, col: 0  }, // North
      ],
      location: [2, 1],
      automove: [-1, 0],
      reachedOpp: false
  };

  let forestGiraffe = {
    name: 'playerGiraffe',
    owner: 1,
    moveDirections: [
        { row: -1, col: 0  }, // North
      ],
      location: [3, 2],
      automove: [-1, 0]
    };

  let forestElephant = {
    name: 'playerElephant',
    owner: 1,
    moveDirections: [
        { row: -1, col: 0  }, // North
      ],
      location: [3, 0],
      automove: [-1, 1]
    };

  let skyLion = {
    name: 'enemyLion',
    owner: 2,
    moveDirections: [
        { row: -1, col: 0  }, // North
        { row: 1,  col: 0  }, // South
        { row: 0,  col: -1 }, // West
        { row: 0,  col: 1  }, // East
        { row: -1, col: -1 }, // Northwest
        { row: 1,  col: -1 }, // Southwest
        { row: -1, col: 1  }, // Northeast
        { row: 1,  col: 1  } // Southeast
      ],
      location: [0, 1],
      automove: [1, 0],
      isCaptured: false,
      isUnderCheck: false,
      reachedOpp: false

    };

  let skyChick = {
    name: 'enemyChick',
    owner: 2,
    moveDirections: [
        { row: -1, col: 0  }, // North
      ],
      location: [1, 1],
      automove: [1, 0],
      reachedOpp: false
    };

  let skyGiraffe = {
    name: 'enemyGiraffe',
    owner: 2,
    moveDirections: [
        { row: -1, col: 0  }, // North
      ],
      location: [0, 0],
      automove: [1, 0]
    };

  let skyElephant = {
    name: 'enemyElephant',
    owner: 2,
    moveDirections: [
        { row: -1, col: 0  }, // North
      ],
      location: [0, 2],
      automove: [1, -1]
    };

let initBoardState = [
                  [skyGiraffe, skyLion, skyElephant],
                  [null, skyChick, null],
                  [null, forestChick, null],
                  [forestElephant, forestLion, forestGiraffe]
                ];

let initialSkyStandState = [
                 null, null, null, null, null, null
                ];

let initialForestStandState = [
                 null, null, null, null, null, null
                ];


function refreshPage(){ 
  setTimeout(location.reload.bind(location), 2500);; 
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      initial: initBoardState,
      initSkyStand: initialSkyStandState,
      initForestStand: initialForestStandState,
      currentPlayer: 1, 
      moveInProgress: false,
      captures:[],
      activated: false
    }

    this.hardCode = this.hardCode.bind(this);
    this.cycleWinChecker = this.cycleWinChecker.bind(this);
    this.immediateWin = this.immediateWin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount() {
    axios.get('/users')
     .then(function (response) {
       console.log(response);
     })
     .catch(function (error) {
       console.log(error);
     });
  }

  updatePlayerInfo(text) {
    return <GameStatus text={text} />
  }

  cycleWinChecker() {
    let boardState = this.state.initial;
      for (var i = 0; i < boardState.length; i++) {
        for (var j = 0; j < boardState[0].length; j++) {
          if (boardState[i][j] === null || boardState[i][j].isCaptured === undefined) {
            continue;
          } else if (boardState[i][j].isCaptured) {
            let loser = boardState[i][j].currentPlayer;
              if (loser === 1) {
                return <div> Player 2 Wins!</div>
              } else {
                return <div> Player 1 Wins!</div>
              }
            } 
        }
      }

    return;
  }

  immediateWin (flag) {
    if (flag) {
      //console.log('GAME OVER')
     this.setState({
      activated: true
    });
    }

  }

  switchPlayer() {
    let currentPlayer = this.state.currentPlayer;
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
    this.setState({'currentPlayer': currentPlayer});
  }


  isValidMove(row, col) {
    const { moveInProgress, initial, validMoves} = this.state;
    let target = initial;
    if (target === undefined) {
      return false;
    } 

    if (target === null) {
      return true;
    }

    if (target.owner === player) {
      return false;
    }

    return true;  
  }

  handleClick (e) {
    e.preventDefault();
    this.setState({moveInProgress: true})
    console.log('firing')
    alert(this.state.moveInProgress)

  }

  hardCode (row, col) {
    const {currentPlayer, moveInProgress, initial, validMoves} = this.state;
    let source = initial[row][col];
    
    if (source.owner !== currentPlayer) {
     
      return;
      
    } else if (source !== null){
      let x = row + source.automove[0];
      let y = col + source.automove[1];
      let dest = initial[x][y]
      if (dest && dest.isCaptured !== undefined) {
        dest.isCaptured = true;
        this.immediateWin(dest.isCaptured);
      }

      
      initial[x][y] = source;
      initial[row][col] = null;
      this.switchPlayer();
    }

  }
 
  // completeMove(row, col, movingPiece = this.state.movingPiece) {
    
  //   const {player, moveInProgress, initial, validMoves} = this.state;

  //   let source = initial[movingPiece.location[0]][movingPiece.location[1]];
  //   console.log('complete', source)
  //   initial[movingPiece.location[0]][movingPiece.location[1]] = null;
  //   let destination = initial[row][col];
  //   console.log('dest', destination)
  //   if (destination !== null) {
  //     this.state.captures.push(destination);
  //   }
  //   console.log('dest', movingPiece)
  //   destination = source;

  //   this.setState({moveInProgress: false});
  //   this.setState({movingPiece: null});
  //   this.setState({validMoves: null});
  //   this.switchPlayer();
  // }

  // cancelMove() {
  //   this.setState({moveInProgress: false});
  //   this.setState({movingPiece: null});
  //   this.setState({validMoves: null});
  // }
 //{this.state.activated ? setTimeout(refreshPage, 3000) : null}
  render () {
    return (
      <div>
        <Game status={this.state.initial} handleMove={this.hardCode} handleClick={this.handleClick} skystand={this.state.initSkyStand} foreststand={this.state.initForestStand}/>
        {this.state.activated ? <div className="gamestatus"> GAME OVER </div> : null}
        {this.state.activated ? refreshPage() : null}
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));