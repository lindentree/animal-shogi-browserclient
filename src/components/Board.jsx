import React from 'react';
import Square from './Square.jsx';
import SkyPieceStand from './SkyPieceStand.jsx';
import ForestPieceStand from './ForestPieceStand.jsx';

export default class Board extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  renderSquare(i, j, id) {
    return (
      <Square 
        id={id}
        key={i + '0' + j}
        piece={this.props.status[i][j]} 
        handleClick={this.props.handleClick}
        row={i}
        col={j}
      />
    );
  }

  render() {
    
    return (
      <React.Fragment>
      <SkyPieceStand status={this.props.skystand} handleBenchClick={this.props.handleBenchClick}/>
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
      <ForestPieceStand status={this.props.foreststand} handleBenchClick={this.props.handleBenchClick}/> 
      </React.Fragment>
    );
  }
}