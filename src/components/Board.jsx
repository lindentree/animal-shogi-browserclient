import React from 'react';
import Square from './Square.jsx';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }


  renderSquare(i, j, id) {
    //console.log('outer', this.state.squares[i])
    return (
      <Square 
        id= {id}
        piece= {this.props.status[i][j]} 
        handleMove={this.props.handleMove}
        row={i}
        col={j}
      />
    );
  }

  render() {
    
    return (
      <div className="board" id="one">
        <div className="sky-row">
          {this.renderSquare(0, 0, 1)}
          {this.renderSquare(0, 1, 2)}
          {this.renderSquare(0, 2, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0, 4)}
          {this.renderSquare(1, 1, 5)}
          {this.renderSquare(1, 2, 6)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0, 7)}
          {this.renderSquare(2, 1, 8)}
          {this.renderSquare(2, 2, 9)}
        </div>
        <div className="forest-row">
          {this.renderSquare(3, 0, 10)}
          {this.renderSquare(3, 1, 11)}
          {this.renderSquare(3, 2, 12)}
        </div>
      </div>
    );
  }
}