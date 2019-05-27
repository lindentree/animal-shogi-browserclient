import React from 'react';
import ReactDOM from 'react-dom';
//import axios from 'axios';
import Game from './components/Game.jsx';
import GameStatus from './components/GameStatus.jsx';

   
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


let gametext;

let newAllPieces = {
  playerLion: {
    name: 'playerLion',
    owner: 1,
    position: [3, 1],
    active: false,
    isCaptured: false,
    isUnderCheck: false,
    reachedOpp: false,
    moves: [
      { row: 1,  col: 0  }, // South
      { row: -1, col: 0  }, // North
      { row: 0,  col: -1 }, // East
      { row: 0,  col: 1  }, // West
      { row: 1,  col: -1 }, // Southwest
      { row: -1, col: -1 }, // Northwest
      { row: 1,  col: 1  }, // Southeast
      { row: -1, col: 1  }, // Northeast
    ]

    },
  playerChick : {
    name: 'playerChick',
    alt: 'enemyChick',
    promote: 'playerChick',
    owner: 1,
    position: [2, 1],
    isCaptured: false,
    reachedOpp: false,
    promoted: false,
    moves: [
      { row: -1, col: 0 }   // North
    ]
  },

  playerGiraffe : {
    name: 'playerGiraffe',
    alt: 'enemyGiraffe',
    owner: 1,
    position: [3, 2],
    isCaptured: false,
    moves: [
      { row: -1, col: 0  }, // North
      { row: 1,  col: 0  }, // South
      { row: 0,  col: -1 }, // West
      { row: 0,  col: 1  }, // East
    ]
  },

  playerElephant : {
    name: 'playerElephant',
    owner: 1,
    position: [3, 0],
    isCaptured: false,
    moves: [
      { row: -1, col: -1 }, // Northwest
      { row: 1,  col: -1 }, // Southwest
      { row: 1,  col: 1  }, // Southeast
      { row: -1, col: 1  }, // Northeast
    ]
    },

  enemyLion : {
    name: 'enemyLion',
    owner: 0,   
    position: [0, 1],
    isCaptured: false,
    isUnderCheck: false,
    reachedOpp: false,
    moves: [
      { row: 1,  col: 0  }, // South
      { row: -1, col: 0  }, // North
      { row: 0,  col: -1 }, // East
      { row: 0,  col: 1  }, // West
      { row: 1,  col: -1 }, // Southwest
      { row: -1, col: -1 }, // Northwest
      { row: 1,  col: 1  }, // Southeast
      { row: -1, col: 1  }, // Northeast
    ]

    },

  enemyChick : {
    name: 'enemyChick',
    owner: 0,
    position: [1, 1],
    isCaptured: false,
    reachedOpp: false,
    moves: [
      { row: 1, col: 0 }  // South
    ]
    },

  enemyGiraffe : {
    name: 'enemyGiraffe',
    owner: 0,
    isCaptured: false,
    position: [0, 0],
    moves: [
      { row: 1,  col: 0  }, // South
      { row: -1, col: 0  }, // North
      { row: 0,  col: -1 }, // West
      { row: 0,  col: 1  }, // East
    ]
    },
  enemyElephant : {
    name: 'enemyElephant',
    alt: 'playerElephant',
    owner: 0,
    isCaptured: false,
    position: [0, 2],
    moves: [
      { row: 1,  col: -1 }, // Southwest
      { row: -1, col: -1 }, // Northwest
      { row: 1,  col: 1  }, // Southeast
      { row: -1, col: 1  }, // Northeast
    ]
    }

}
  

let initBoardState = [
                  [null, null, null],
                  [null, null, null],
                  [null, null, null],
                  [null, null, null]
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
      pieces: newAllPieces,
      currentPlayer: 1, 
      moveInProgress: false,
      activePiece: null,
      start:[],
      end:[],
      activated: false
    }

    this.cycleWinChecker = this.cycleWinChecker.bind(this);
    this.immediateWin = this.immediateWin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkPiecePosition = this.checkPiecePosition.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
    this.isValidMove = this.isValidMove.bind(this);
  }


  componentDidMount() {

    this.checkPiecePosition()

    // axios.get('/users')
    //  .then(function (response) {
    //    console.log(response);
    //  })
    //  .catch(function (error) {
    //    console.log(error);
    //  });
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
    currentPlayer = (currentPlayer === 1) ? 0 : 1;
    this.setState({'currentPlayer': currentPlayer});
  }


  isValidMove(pos, moves, dest) {
    console.log(arguments)

    let x = dest[0] - pos[0];
    let y = dest[1] - pos[1]; 

    for (let i = 0; i < moves.length; i += 1) {
      if (moves[i].row == x && moves[i].col == y ) {
        return true;
      }
    }    

    return false;

  }

  captureMethod () {

  }

  handleClick (e) {
    e.preventDefault();
    let status = this.state.moveInProgress;
    let board = this.state.initial;

    let forest = this.state.initForestStand.slice();
    let sky = this.state.initSkyStand.slice();
    let z = forest.indexOf(null);
    let z2 = sky.indexOf(null);;

    let pieces = this.state.pieces;

    let active = this.state.activePiece;
    
    let x = parseInt(e.target.getAttribute('x'));
    let y = parseInt(e.target.getAttribute('y'));
    let coordinates = [x, y];
 
    let name = e.target.getAttribute('name')//string or null
    let turn = this.state.currentPlayer;
    
    
    if (name === null && !status) {
      console.log('test')
      return;
    } else if (name !== null && !status) {
        let player = pieces[name].owner;
        if (turn !== player) {
          alert("Not this side's turn!");
          return;
        }

       let currentPiece = pieces[name];
      
       this.setState({activePiece: currentPiece})
       this.setState({start: coordinates})

    } else if (status && name === null) {
      
      let x2 = this.state.start[0];
      let y2 = this.state.start[1];
      let piece = board[x2][y2];
      let start = this.state.start;

      let valid = this.isValidMove(start, piece.moves, coordinates)

      if (valid) {
        board[x][y] = active;
        board[x2][y2] = null;
        this.switchPlayer();
      } else {
        alert("Invalid move!");
        this.setState({moveInProgress: !status})
        return;
      }

    } else {

      let x2 = this.state.start[0];
      let y2 = this.state.start[1];
      let piece = board[x2][y2];
      let start = this.state.start;
      let valid = this.isValidMove(start, piece.moves, coordinates)
      console.log('testing', name)

      if (board[x][y].owner === turn) {
        alert("Can't capture own piece");
        this.setState({moveInProgress: !status});
        return;
      }

      if (name == 'playerLion') {
        board[x][y] = active;
        board[x2][y2] = null;
     
        gametext = 'PLAYER TWO WINS';
        let status = this.state.activated;
        this.setState({activated: !status});
        return;

      }  

      if (name == 'enemyLion') {
        console.log('firing', name)
        board[x][y] = active;
        board[x2][y2] = null;
        
        gametext = 'PLAYER ONE WINS';
        let status = this.state.activated;
        this.setState({activated: !status});
        return;

      }

      if (valid) {
        piece.isCaptured = true;

        if (board[x][y].owner == 0) {
          board[x][y].owner = 1;
          console.log('forest')
          forest[z] = board[x][y];
          this.setState({initForestStand:forest})
        } else {
          console.log('sky')
          board[x][y].owner = 0;
          sky[z2] = board[x][y];
          this.setState({initSkyStand:sky})
        } 
      
        board[x][y] = active;
      
        board[x2][y2] = null;

        this.setState({initial: board})
        console.log(active,'moving piece')
        console.log(this.state,'state')

        this.setState({moveInProgress: !status})
      
        this.setState({activePiece: null})
        this.switchPlayer();

      } else {
        alert('Invalid move');
        this.setState({moveInProgress: !status})
        return;
      }
      
      
    
     }        
     this.setState({moveInProgress: !status})
    
  }


  checkPiecePosition () {
    let pieces = this.state.pieces;
    let board = this.state.initial.slice();

    for (let key in newAllPieces) {
      
      let x = newAllPieces[key].position[0];
      let y = newAllPieces[key].position[1];
      board[x][y] = newAllPieces[key];
    }

    this.setState({initial: board});

  }

  movePiece (coordinates) {
    let pieces = this.state.pieces;

  }

  handleBenchClick (e) {
    e.preventDefault();
    let forest = this.state.initForestStand.slice();
    let sky = this.state.initSkyStand.slice();


  }

  render () {
    return (
      <div>
        <Game status={this.state.initial} handleClick={this.handleClick} skystand={this.state.initSkyStand} foreststand={this.state.initForestStand}/>
        {this.state.activated ? <div className="gamestatus"> {gametext} </div> : null}
        {this.state.activated ? refreshPage() : null}
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));