import React from 'react';
import Square from './Square.jsx';

let test = {piece: "enemyChick"}

export default class SkyPieceStand extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSquare(i, id) {
     return (
      <Square 
        piece= {this.props.status[i]} 
        id= {id}
      />
    );
  }

  dropPiece(i) {

  }

  render() {

    return (
      <div>
  
        <div id="skyStand">
          {this.renderSquare(0, 13)}
          {this.renderSquare(1, 14)}
          {this.renderSquare(2, 15)}
          {this.renderSquare(3, 16)}
          {this.renderSquare(4, 17)}
          {this.renderSquare(5, 18)}
        </div>
      </div>
    );
  }
}
