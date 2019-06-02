import React from 'react';
import ReactDOM from 'react-dom';
//import axios from 'axios';
import Board from './components/Board.jsx';
import GameStatus from './components/GameStatus.jsx';

let gametext;

let pieces = {
  playerLion: {
    name: 'playerLion',
    alt: 'enemyLion',
    owner: 1,
    position: [3, 1],
    active: false,
    isCaptured: false,
    isUnderCheck: false,
    reachedOpp: false,
    source: null,
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
    promote: 'playerHen',
    owner: 1,
    position: [2, 1],
    isCaptured: false,
    reachedOpp: false,
    promoted: false,
    moves: [
      { row: -1, col: 0 }   // North
    ]
  },
   playerHen : {
    name: 'playerHen',
    alt: 'enemyChick',
    owner: 1,   
    position: [],
    isCaptured: false,
    moves: [
      { row: 1,  col: 0  }, // South
      { row: -1, col: 0  }, // North
      { row: 0,  col: -1 }, // East
      { row: 0,  col: 1  }, // West
      { row: -1, col: -1 }, // Northwest
      { row: -1, col: 1  }, // Northeast
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
    alt: 'enemyElephant',
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
    alt: 'playerChick',
    promote: 'enemyHen',
    owner: 0,
    position: [1, 1],
    isCaptured: false,
    reachedOpp: false,
    moves: [
      { row: 1, col: 0 }  // South
    ]
    },
  enemyHen : {
    name: 'enemyHen',
    alt: 'playerChick',
    owner: 0,   
    position: [],
    isCaptured: false,
    moves: [
      { row: 1,  col: 0  }, // South
      { row: -1, col: 0  }, // North
      { row: 0,  col: -1 }, // East
      { row: 0,  col: 1  }, // West
      { row: 1,  col: -1 }, // Southwest
      { row: 1,  col: 1  }, // Southeast
    ]
    },
  enemyGiraffe : {
    name: 'enemyGiraffe',
    alt: 'playerGiraffe',
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

function hack(){//solves laggy repaint in Safari/mobile browsers
  let size = 1.001 + Math.random()/1000;
  window.parent.parent.document.body.style.zoom = size;
} 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      board: [
                  [null, null, null],
                  [null, null, null],
                  [null, null, null],
                  [null, null, null]
                ],
      sky: [
             null, null, null, null, null, null
           ],
      forest: [
                null, null, null, null, null, null
              ],
      pieces: pieces,
      currentPlayer: 1, 
      moveInProgress: false,
      isDropping: false,
      activePiece: null,
      start:[],
      drop:[],
      dropOrigin: null,
      activated: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.startPiecePosition = this.startPiecePosition.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
    this.isValidMove = this.isValidMove.bind(this);
    this.reachedLastRow = this.reachedLastRow.bind(this);
    this.isLionUnderCheck = this.isLionUnderCheck.bind(this);
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
    let board = JSON.parse(JSON.stringify(this.state.board));
    let source = this.state.source;

    let forest = this.state.forest.slice();
    let sky = this.state.sky.slice();
    let z = forest.indexOf(null);
    let z2 = sky.indexOf(null);;

    let mark = e.target.getAttribute('id');

    let active = this.state.activePiece;
    let status = this.state.activated;
    let dropping = this.state.isDropping;
    let dropOrigin = this.state.dropOrigin;
    
    let x = parseInt(e.target.getAttribute('x'));
    let y = parseInt(e.target.getAttribute('y'));
    let coordinates = [x, y];
    let start = this.state.start.slice();
    let x2 = start[0];
    let y2 = start[1];
 
    let name = e.target.getAttribute('name')//string or null
    let turn = this.state.currentPlayer;

    if (name === null && !moving && !dropping) {
      return;
    } else if (name !== null && !moving && !dropping && mark === 'board') {
        let player = pieces[name].owner;
          if (turn !== player) {
            alert("Not this side's turn!");
            return;
          }

        let currentPiece = pieces[name];
        this.setState({activePiece: currentPiece, start: coordinates, source: name, moveInProgress: true});
        return;

    } else if (moving && name === null && !dropping && mark === 'board') {
   
      let valid = this.isValidMove(start, active.moves, coordinates)

      if (valid) {
        if (active.name === 'playerChick' || active.name === 'enemyChick') {
          let test = this.reachedLastRow(active, coordinates);
          if (test) {
            active = pieces[active.promote];
          } else {
            return;
          }
         
        }

        if (active.name === 'playerLion' || active.name === 'enemyLion') {
          let test = this.reachedLastRow(active, coordinates);
            if (test) {
              //console.log('fire')
              let condition = this.isLionUnderCheck(board, turn, coordinates);

              if (!condition) {
                console.log('fire')
                if (active.name === 'playerLion') {
                  gametext = 'PLAYER ONE WINS';
                } else {
                  gametext = 'PLAYER TWO WINS';
                }

                 board[x][y] = active;
                 board[x2][y2] = null;

                this.setState({board: board, moveInProgress: false, activated: !status});

              } else {
                this.switchPlayer();
              }
            }
          
        }

        board[x][y] = active;
        board[x2][y2] = null;

        this.setState({board: board, moveInProgress: false});
        hack();
        this.switchPlayer();
        return;
        //this.forceUpdate();     
      } else {
          alert("Invalid move!");
          this.setState({moveInProgress: false});
          return;
      }
    } else if (moving && name !== null && !dropping && mark === 'board'){
  
        let valid = this.isValidMove(start, active.moves, coordinates)

        if (!valid) {
          alert('Invalid move');
          this.setState({moveInProgress: false});
          return;
        }

        if (board[x][y].owner === turn) {
          alert("Can't capture own piece");
          this.setState({moveInProgress: false});
          return;
  
        }  

        if (valid) {

        if (active.name === 'playerChick' || active.name === 'enemyChick') {
            let test = this.reachedLastRow(active, coordinates);
            if (test) {
              active = pieces[active.promote];
            } 
        }

        if (name == 'playerLion') {
          board[x][y] = active;
          board[x2][y2] = null;
          this.setState({board: board});
          gametext = 'PLAYER TWO WINS';
          this.setState({activated: !status});
          return;

        }  

        if (name == 'enemyLion') {
          board[x][y] = active;
          board[x2][y2] = null;
          this.setState({board: board});
          gametext = 'PLAYER ONE WINS';
          this.setState({activated: !status});
          return;
        }

          board[x][y].isCaptured = true;

        if (board[x][y].owner == 0) {

            let capture = board[x][y];
            forest[z] = pieces[capture['alt']];
            this.setState({forest:forest})
          
          } else {

            let capture = board[x][y]
            sky[z2] = pieces[capture['alt']];
            this.setState({sky:sky})
          } 
      
          board[x][y] = active;
          board[x2][y2] = null;

          this.setState({board: board, moveInProgress: false, activePiece: null })
          hack();
          this.switchPlayer();
          //this.forceUpdate(); 
          return;
      } 
    } else if (name !== null && mark === 'bench' && !moving){
        let currentPiece = pieces[name];
        
        if (turn !== currentPiece.owner) {
            alert("Not this side's turn!");
            return;
          }

        if (currentPiece.owner === 1) {
          dropOrigin = forest.indexOf(currentPiece);
          this.setState({dropOrigin: dropOrigin});
        } else {
          dropOrigin = sky.indexOf(currentPiece); 
          this.setState({dropOrigin: dropOrigin});
        }
      this.setState({activePiece: currentPiece, isDropping: true, moveInProgress: false})
      return;

    } else if (name === null && mark === 'board' && dropping) {
        let bench;

        if(this.state.currentPlayer === 1) {
          bench = forest;
       
        } else {
          bench = sky;
        }

        board[x][y] = active;
        bench[dropOrigin] = null;
        this.setState({board:board, activePiece: null, isDropping: false, forest: forest, sky: sky})
        this.switchPlayer();
        hack();
        return;
      } else if (name !== null && mark === 'board' && dropping || mark === 'bench'){
          this.setState({isDropping: false})
          alert('Invalid drop');
          return;
      } else {
          hack();
          this.switchPlayer();
          //this.forceUpdate();
          return;
      }
      this.switchPlayer();
  }

  startPiecePosition () {

    let board = JSON.parse(JSON.stringify(this.state.board));

    board[0][2] = pieces.enemyElephant;
    board[0][0] = pieces.enemyGiraffe;
    board[1][1] = pieces.enemyChick;
    board[0][1] = pieces.enemyLion;
    board[3][0] = pieces.playerElephant;
    board[3][2] = pieces.playerGiraffe;
    board[2][1] = pieces.playerChick;
    board[3][1] = pieces.playerLion;

    this.setState({ board: board });
  }

  reachedLastRow (player, position) {
    
    let p = [[0, 0],[0, 1],[0, 2]];
    let e = [[3, 0],[3, 1],[3, 2]];

    if (player.owner === 1) {
    
      for (let i = 0; i < p.length; i += 1) {
        if(position[0] === p[i][0] && position[1] === p[i][1]) {
  
          return true;
        } else {
          continue;
        }
      }
    } else {
        for (let i = 0; i < e.length; i += 1) {
          if(position[0] === e[i][0] && position[1] === e[i][1]) {
            return true;
          } else {
            continue;
          }
      }
    }

    return false;
  }

  isLionUnderCheck (boardstate, player, position) {
    //console.log(arguments)
    let directions = [
      { row: 1,  col: 0  }, // South
      { row: -1, col: 0  }, // North
      { row: 0,  col: -1 }, // East
      { row: 0,  col: 1  }, // West
      { row: 1,  col: -1 }, // Southwest
      { row: -1, col: -1 }, // Northwest
      { row: 1,  col: 1  }, // Southeast
      { row: -1, col: 1  }, // Northeast
    ]
    
    if (boardstate === undefined) {
      alert('problem')
    }
    
    for (let i = 0; i < directions.length; i += 1) {
      let x = position[0] + directions[i]['row'];
      let y = position[1] + directions[i]['col'];

      let spot = [x, y];
      let piece;

      if (boardstate[x] === undefined || boardstate[x][y] === undefined || boardstate[x][y] === null) {
        continue;
      } else {
          piece = boardstate[x][y];
      }

      if (piece.owner === player) {
        continue;
      } else {

         let check = this.isValidMove(spot, piece.moves, position);
         if (check) {
           return true;
         } else {
          continue;
         }
      }

      return false;

    }

    return false;

  }

  render () {
    return (
      <div>
        <Board status={this.state.board} handleClick={this.handleClick} skystand={this.state.sky} foreststand={this.state.forest}/>
        {this.state.activated ? <div className="gamestatus"> {gametext} </div> : null}
        {this.state.activated ? refreshPage() : null}
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));