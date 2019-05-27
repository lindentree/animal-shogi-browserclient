import React from 'react';
import ReactDOM from 'react-dom';
//import axios from 'axios';
import Board from './components/Board.jsx';
import GameStatus from './components/GameStatus.jsx';

let gametext;

let pieces = {
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

function refreshPage(){ 
  setTimeout(location.reload.bind(location), 2500);; 
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      initial: [
                  [null, null, null],
                  [null, null, null],
                  [null, null, null],
                  [null, null, null]
                ],
      initSkyStand:  [
                 null, null, null, null, null, null
                ],
      initForestStand:  [
                 null, null, null, null, null, null
                ],
      pieces: pieces,
      currentPlayer: 1, 
      moveInProgress: false,
      activePiece: null,
      start:[],
      activated: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.startPiecePosition = this.startPiecePosition.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
    this.isValidMove = this.isValidMove.bind(this);
  }

  componentDidMount() {

    this.startPiecePosition()

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

  switchPlayer() {
    let currentPlayer = this.state.currentPlayer;
    currentPlayer = (currentPlayer === 1) ? 0 : 1;
    this.setState({'currentPlayer': currentPlayer});
  }

  isValidMove(pos, moves, dest) {

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
    let moving = this.state.moveInProgress;
    let board = JSON.parse(JSON.stringify(this.state.initial));

    let forest = this.state.initForestStand.slice();
    let sky = this.state.initSkyStand.slice();
    let z = forest.indexOf(null);
    let z2 = sky.indexOf(null);;

    let active = this.state.activePiece;
    let status = this.state.activated;
    
    let x = parseInt(e.target.getAttribute('x'));
    let y = parseInt(e.target.getAttribute('y'));
    let coordinates = [x, y];
    let start = this.state.start.slice();
    let x2 = start[0];
    let y2 = start[1];
 
    let name = e.target.getAttribute('name')//string or null
    let turn = this.state.currentPlayer;
    
    if (name === null && !moving) {
      return;
    } else if (name !== null && !moving) {
        let player = pieces[name].owner;
        if (turn !== player) {
          alert("Not this side's turn!");
          return;
        }

       let currentPiece = pieces[name];
       this.setState({activePiece: currentPiece, start: coordinates});

    } else if (moving && name === null) {
      
      let valid = this.isValidMove(start, active.moves, coordinates)

      if (valid) {
        board[x][y] = active;
        board[x2][y2] = null;
        this.setState({initial: board})
        this.switchPlayer();
        this.forceUpdate();
       
      } else {
        alert("Invalid move!");
        this.setState({moveInProgress: !moving})
        return;
      }

    } else {

      let valid = this.isValidMove(start, active.moves, coordinates)

      if (!valid) {
        alert('Invalid move');
        this.setState({moveInProgress: !moving});
        return;
      }

      if (board[x][y].owner === turn) {
        alert("Can't capture own piece");
        this.setState({moveInProgress: !moving});
        return;
  
      }

      if (name == 'playerLion') {
        board[x][y] = active;
        board[x2][y2] = null;
     
        gametext = 'PLAYER TWO WINS';
        this.setState({activated: !status});
        return;

      }  

      if (name == 'enemyLion') {
        board[x][y] = active;
        board[x2][y2] = null;
        
        gametext = 'PLAYER ONE WINS';
        this.setState({activated: !status});
        return;

      }

      if (valid) {
        board[x][y].isCaptured = true;

          if (board[x][y].owner == 0) {

            board[x][y].owner = 1;
            forest[z] = board[x][y];
            this.setState({initForestStand:forest})
          } else {

            board[x][y].owner = 0;
            sky[z2] = board[x][y];
            this.setState({initSkyStand:sky})
          } 
      
        board[x][y] = active;
        board[x2][y2] = null;

        this.setState({initial: board, moveInProgress: !moving, activePiece: null })
        this.switchPlayer();
        this.forceUpdate();

      } 
    
     } 

    this.setState({moveInProgress: !moving});
    this.forceUpdate();
    
  }

  startPiecePosition () {
    let board = JSON.parse(JSON.stringify(this.state.initial));

    for (let key in pieces) {
      
      let x = pieces[key].position[0];
      let y = pieces[key].position[1];
      board[x][y] = pieces[key];
    }

    this.setState({initial: board});

  }

  movePiece (coordinates) {
    let p = this.state.pieces;

  }

  handleBenchClick (e) {
    e.preventDefault();
    let forest = this.state.initForestStand.slice();
    let sky = this.state.initSkyStand.slice();


  }

  render () {
    return (
      <div>
        <Board status={this.state.initial} handleClick={this.handleClick} skystand={this.state.initSkyStand} foreststand={this.state.initForestStand}/>
        {this.state.activated ? <div className="gamestatus"> {gametext} </div> : null}
        {this.state.activated ? refreshPage() : null}
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));