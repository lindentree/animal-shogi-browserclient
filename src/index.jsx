import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';
import GameStatus from './components/GameStatus.jsx';

let gametext;

let pieces = {
  playerLion: {
    name: 'playerLion',
    alt: 'enemyLion',
    owner: 1,
    position: [3, 1],
    activePiece: false,
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
  setTimeout(location.reload.bind(location), 2500);
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
      activated: false,
      lion: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.moveMethod = this.moveMethod.bind(this);
    this.startPiecePosition = this.startPiecePosition.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
    this.isValidMove = this.isValidMove.bind(this);
    this.reachedLastRow = this.reachedLastRow.bind(this);
    this.isLionUnderCheck = this.isLionUnderCheck.bind(this);
  }

  componentDidMount() {

    this.startPiecePosition()

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

  moveMethod(start_x, start_y, end_x, end_y, piece) {

    let activeBoard = [...this.state.board];
    activeBoard[start_x][start_y] = piece;
    activeBoard[end_x][end_y] = null
  
    
    this.setState({board: activeBoard, moveInProgress: false, activePiece: null},
      ()=>{}
    );//end move
    this.switchPlayer();
  }

  captureMethod(piece, curPlayer) {
    let bench;
    let slot; 

    if (curPlayer === 1) {
      bench = [...this.state.forest];
      slot = bench.indexOf(null);
      bench[slot] = pieces[piece['alt']];
      this.setState({forest: bench});

    } else {
      bench = [...this.state.sky];
      slot = bench.indexOf(null);
      bench[slot] = pieces[piece['alt']];
      this.setState({sky: bench});
    }

    this.setState({ moveInProgress: false, activePiece: null},
      ()=>{}
    );


  }

  dropMethod(piece, curPlayer, slot, end_x, end_y) {
    let bench;

    let activeBoard = [...this.state.board];
    activeBoard[end_x][end_y] = piece;

    if (curPlayer === 1) {
      bench = [...this.state.forest];
      bench[slot] = null;
      this.setState({forest: bench});

    } else {
      bench = [...this.state.sky];
      bench[slot] = null;
      this.setState({sky: bench});
    }

    this.setState({ board: activeBoard, isDropping: false, moveInProgress: false, activePiece: null},
      ()=>{}
    );

    this.switchPlayer();

  }
 
  handleClick (e) {
    e.preventDefault();

    let { moveInProgress, activePiece, activated, isDropping, dropOrigin, lion, currentPlayer } = { ...this.state }

    let board = [...this.state.board];
    let forest = [...this.state.forest];
    let sky = [...this.state.sky];

    let mark = e.target.getAttribute('id');
    let x = parseInt(e.target.getAttribute('x'));
    let y = parseInt(e.target.getAttribute('y'));

    let coordinates = [x, y];

    let start = [...this.state.start];
    let [x2, y2] = start;
 
    let name = e.target.getAttribute('name')//string or null

    if (name === null && !moveInProgress && !isDropping) {
      return;

    } else if (name !== null && !moveInProgress && !isDropping && mark === 'board') {
        let player = pieces[name].owner;
          if (currentPlayer !== player) {
            alert("Not this side's turn!");
            return;
          }

        let currentPiece = pieces[name];
        this.setState({activePiece: currentPiece, start: coordinates, source: name, moveInProgress: true});
        return;

    } else if (moveInProgress && name === null && !isDropping && mark === 'board') {
   
      let valid = this.isValidMove(start, activePiece.moves, coordinates)

      if (valid) {
       
        if(lion) {
          alert('You must capture the lion!');
          this.setState({moveInProgress: false});
          return;
        }


        if (activePiece.name === 'playerChick' || activePiece.name === 'enemyChick') {
          let test = this.reachedLastRow(activePiece, coordinates);
          if (test) {
            activePiece = pieces[activePiece.promote];
          } 
         
        }

        if (activePiece.name === 'playerLion' || activePiece.name === 'enemyLion') {
           
          
          let test = this.reachedLastRow(activePiece, coordinates);
            if (test) {
    
              let condition = this.isLionUnderCheck(board, currentPlayer, coordinates);

              if (!condition) {
                console.log('firing test', activePiece)
                if (activePiece.name === 'playerLion') {
                  gametext = 'PLAYER ONE WINS';
                } else {
                  gametext = 'PLAYER TWO WINS';
                }


                this.setState({activated: true});
                this.moveMethod(x, y, x2, y2, activePiece);
                
                return;

              } else {

                this.moveMethod(x, y, x2, y2, activePiece);
                return;
              }
            } 
        }
        
        this.moveMethod(x, y, x2, y2, activePiece);
        hack();
        return;
   
      } else {
          alert("Invalid move!");
          this.setState({moveInProgress: false});
          return;
      }
    } else if (moveInProgress && name !== null && !isDropping && mark === 'board'){
         
        let valid = this.isValidMove(start, activePiece.moves, coordinates);

        if (!valid) {
          alert('Invalid move');
          this.setState({moveInProgress: false});
          return;
        }

        if (board[x][y].owner === currentPlayer) {
          alert("Can't capture own piece");
          this.setState({moveInProgress: false});
          return;
  
        }  

        if (activePiece.name === 'playerChick' || activePiece.name === 'enemyChick') {
          let test = this.reachedLastRow(activePiece, coordinates);
          if (test) {
            activePiece = pieces[activePiece.promote];
          } 
         
        }

        let capture = board[x][y];

        if (activePiece.name === 'playerLion' || activePiece.name === 'enemyLion') {
           
            let test = this.reachedLastRow(activePiece, coordinates);
              if (test) {
                let condition = this.isLionUnderCheck(board, currentPlayer, coordinates);
                 console.log('sanity')
                if (!condition) {
                  if (activePiece.name === 'playerLion') {
                    gametext = 'PLAYER ONE WINS';
                  } else {
                    gametext = 'PLAYER TWO WINS';
                  }


                  this.setState({activated: true});
                  this.moveMethod(x, y, x2, y2, activePiece);
                  
                  return;
              } else {
                  
                  if (capture.name === 'enemyLion' || capture.name === 'playerLion') {
                    if (capture.owner === 1) {
                      gametext = 'PLAYER TWO WINS';
                      this.moveMethod(x, y, x2, y2, activePiece);
                      this.setState({activated: true});
                      return;

                    } else {
                      gametext = 'PLAYER ONE WINS';
                      this.moveMethod(x, y, x2, y2, activePiece);
                      this.setState({activated: true});
                      return;
                    }
                  }

                this.setState({lion: true});
                this.captureMethod(capture, currentPlayer);
                this.moveMethod(x, y, x2, y2, activePiece);
                
              
                return;
               }
            } 
        }

        if (lion) {
          console.log("double sanity")
          
          if (name !== 'enemyLion' && name !== 'playerLion') {
            alert('You must capture the lion!');
            this.setState({moveInProgress: false});
            return;

          } else {
              if (name === 'playerLion') {
                this.captureMethod(capture, currentPlayer);
                gametext = 'PLAYER TWO WINS';
                this.setState({ lion: false, activated: true });
                return;

             } else if (name === 'enemyLion') {
                this.captureMethod(capture, currentPlayer);
                gametext = 'PLAYER ONE WINS';
                this.setState({ lion: false, activated: true });
                return;
            }
          }
        }

        if (name === 'playerLion') {
          this.moveMethod(x, y, x2, y2, activePiece);
          gametext = 'PLAYER TWO WINS';
          this.setState({lion: false, activated: true});
          return;

        }  

        if (name === 'enemyLion') {
          this.moveMethod(x, y, x2, y2, activePiece);
          gametext = 'PLAYER ONE WINS';
          this.setState({lion: false, activated: true});
          return;
        }

        if (activePiece.name === 'playerChick' || activePiece.name === 'enemyChick') {
            let test = this.reachedLastRow(activePiece, coordinates);
            if (test) {
              activePiece = pieces[activePiece.promote];
            } else {

            }
        }

        this.captureMethod(capture, currentPlayer);
        this.moveMethod(x, y, x2, y2, activePiece);
        hack();
          //this.forceUpdate(); 
        return;
     
    } else if (name !== null && mark === 'bench' && !moveInProgress){

        let currentPiece = pieces[name];

        if (currentPlayer !== currentPiece.owner) {
            alert("Not this side's turn!");
            return;
        }

        if(lion) {
          alert('You must capture the lion!');
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

    } else if (name === null && mark === 'board' && isDropping) {
      
      this.dropMethod(activePiece, currentPlayer, dropOrigin, x, y);
      return;

      } else if (name !== null && mark === 'board' && isDropping || mark === 'bench'){
          this.setState({isDropping: false})
          alert('Invalid drop');
          return;
      } else {
          hack();
          this.switchPlayer();
          return;
      }
      this.switchPlayer();
  }

  startPiecePosition () {

    let board = [...this.state.board];

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

    let finalRow;

    if (player.owner === 1) {
      finalRow = [[0, 0],[0, 1],[0, 2]];
    } else {
      finalRow = [[3, 0],[3, 1],[3, 2]];
    }
      
    for (let i = 0; i < finalRow.length; i += 1) {
      if(position[0] === finalRow[i][0] && position[1] === finalRow[i][1]) {

        return true;
      }   
    } 

    return false;
  }

  isLionUnderCheck (boardstate, player, position) {
    let directions = [
      { row: 1,  col: 0 }, // South
      { row: -1, col: 0 }, // North
      { row: 0,  col: -1 }, // East
      { row: 0,  col: 1 }, // West
      { row: 1,  col: -1 }, // Southwest
      { row: -1, col: -1 }, // Northwest
      { row: 1,  col: 1 }, // Southeast
      { row: -1, col: 1 }, // Northeast
    ]
    
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