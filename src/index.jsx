import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Game from './components/Game.jsx';
import GameStatus from './components/GameStatus.jsx';
import $ from 'jquery';
  
  /**************************
  *    POSITION VARIABLES   *
  **************************/
  
  // The position of the selected piece
  var selectedPosition = { row: 0, col: 0 };

  // The position of the attacked cell
  var attackPosition = { row: 0, col: 0 };

  // Difference between selected and attack cells
  var differencePosition = { row: 0, col: 0 };

  /**************************
  *    PIECE VALIDATION     *
  **************************/

  // Did we select a cell that is occupied?
  var selectedCell = false;

  // Did we select a cell to attack?
  var attackedCell = false;

  // Did we select a bench piece? 
  var selectedEnemyBenchPiece = false;
  var selectedPlayerBenchPiece = false;
  var selectedPlayerBenchPiecePosition = { col: 0 };
  var selectedEnemyBenchPiecePosition = { col: 0 }; 

  /********************************
  *    GAME EVALUATION VARIABLES  *
  *********************************/

  var playerLionCaptured = false;
  var enemyLionCaptured = false;
  var seenPlayerLion = false;
  var seenEnemyLion = false;
  var gameOver = false;

  /**************************
  *      TURN VARIABLES     *
  **************************/

  var playerTurn = true;
  var enemyTurn = false;
  var turnCount = 1;

  // Has either player moved?
  var playerMoved = false;
  var enemyMoved = false;

  var currentTurn = null; 

  /**************************
  *  PROMOTION VARIABLES  *
  **************************/
  
  var playerChickPromotion = false;
  var playerChickPosition = { row: 0, col: 0 };
  var enemyChickPromotion = false;
  var enemyChickPosition = { row: 0, col: 0 };

  // If Player moved a chick (not placed)
  // it is a legitimate candidate for promotion to Hen
  var movedPlayerChick = false;

  // If Enemy moved a chick (not placed)
  // it is legitimate candidate for promotion to Hen
  var movedEnemyChick = false;

  /**************************
  *     LEGITIMATE MOVES    *
  **************************/
  

    // {
    //   'enemyChick' : [{ row: 1, col: 0 }]  // South
    // },
    // {
    //   'enemyLion' : [
    //     { row: 1,  col: 0  }, // South
    //     { row: -1, col: 0  }, // North
    //     { row: 0,  col: -1 }, // East
    //     { row: 0,  col: 1  }, // West
    //     { row: 1,  col: -1 }, // Southwest
    //     { row: -1, col: -1 }, // Northwest
    //     { row: 1,  col: 1  }, // Southeast
    //     { row: -1, col: 1  }, // Northeast
    //     ]
    // },
    // {
    //   'enemyElephant' : [
    //     { row: 1,  col: -1 }, // Southwest
    //     { row: -1, col: -1 }, // Northwest
    //     { row: 1,  col: 1  }, // Southeast
    //     { row: -1, col: 1  }, // Northeast
    //   ]
    // },
    // {
    //   'enemyGiraffe' : [
    //     { row: 1,  col: 0  }, // South
    //     { row: -1, col: 0  }, // North
    //     { row: 0,  col: -1 }, // West
    //     { row: 0,  col: 1  }, // East
    //   ]
    // },
    // {
    // 'enemyHen' : [
    //     { row: 1,  col: 0  }, // South
    //     { row: -1, col: 0  }, // North
    //     { row: 0,  col: -1 }, // West
    //     { row: 0,  col: 1  }, // East
    //     { row: 1,  col: -1 }, // Southwest
    //     { row: 1,  col: 1  }, // Southeast
    //   ]
    // },
    // {
    //   'playerChick' : [{ row: -1, col: 0 }]   // North
      
    // },
    // {
    // 'playerLion' : [
    //   { row: -1, col: 0  }, // North
    //   { row: 1,  col: 0  }, // South
    //   { row: 0,  col: -1 }, // West
    //   { row: 0,  col: 1  }, // East
    //   { row: -1, col: -1 }, // Northwest
    //   { row: 1,  col: -1 }, // Southwest
    //   { row: -1, col: 1  }, // Northeast
    //   { row: 1,  col: 1  }, // Southeast
    //   ]
    // },
    // {
    // 'playerElephant' : [
    //   { row: -1, col: -1 }, // Northwest
    //   { row: 1,  col: -1 }, // Southwest
    //   { row: 1,  col: 1  }, // Southeast
    //   { row: -1, col: 1  }, // Northeast
    // ]
    // },
    // {
    // 'playerGiraffe' : [
    //   { row: -1, col: 0  }, // North
    //   { row: 1,  col: 0  }, // South
    //   { row: 0,  col: -1 }, // West
    //   { row: 0,  col: 1  }, // East
    //   ]
    // },
    // {'playerHen' : [
    //   { row: -1, col: 0 }, // North
    //   { row: 1,  col: 0 }, // South
    //   { row: 0,  col: -1}, // West
    //   { row: 0,  col: 1 }, // East
    //   { row: -1, col: -1}, // Northwest
    //   { row: -1, col: 1 }, // Northeast 
    //   ]
    // }
    

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
      isCaptured: false,
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

  let testBoard = [
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
    window.location.reload(); 
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      initial: testBoard,
      initSkyStand: initialSkyStandState,
      initForestStand: initialForestStandState,
      currentPlayer: 1, 
      moveInProgress: false,
      movingPiece: null,
      validMoves: null,
      captures:[],
      activated: false
    }

    this.hardCode = this.hardCode.bind(this);
    this.cycleWinChecker = this.cycleWinChecker.bind(this);
    this.immediateWin = this.immediateWin.bind(this);
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
            console.log('winner', loser)
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
      console.log('GAME OVER')
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

  // handleMove(row, col) {
  //   const {player, moveInProgress, initial, validMoves} = this.state;
    
  //   let target = initial[row][col];
  //   console.log('move', target)
  //   console.log('checkout', moveInProgress)

  //   if (moveInProgress) {
  //     console.log('check', moveInProgress)
  //     if (!this.isValidMove(row, col, player)) {
  //       console.log('inner', this.isValidMove(row, col, player))
  //       return this.cancelMove();
  //     }
  //     else {
  //       console.log('innermost', target);
  //       return this.completeMove(row, col, target);
  //     }
  //   }

  //   else {
  //      // console.log('san', target);
  //     if (!target) return;
  //     if (target.owner !== this.state.currentPlayer) return this.cancelMove();
      
  //     for (var i = 0; i < target.moveDirections; i++) {
  //       let x = target.moveDirections[i].row
  //       let y = target.moveDirections[i].col

  //       if (this.isValidMove(x, y)) {
  //         validMoves.push [x, y];
  //       }
  //     }

  //     if (!validMoves.length) {
  //       return this.cancelMove(); // no valid moves were found...
  //     }

  //     else {
  //       this.setState({moveInProgress: true});
  //     console.log('fin', this.state);
  //     this.setState({movingPiece: target});

  //     }
      

  //   } 

  // }

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
      console.log('outer confirm', this.state.currentPlayer);
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

  render () {
    return (
      <div>
        <Game status={this.state.initial} handleMove={this.hardCode} skystand={this.state.initSkyStand} foreststand={this.state.initForestStand}/>
        <GameStatus test={"John"}/>
        {this.state.activated ? <div className="gamestatus">GAME OVER </div> : null}
        {this.state.activated ? setTimeout(refreshPage, 3000) : null}
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));