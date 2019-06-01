import React from 'react';
import Square from './Square.jsx';

export default class SkyPieceStand extends React.PureComponent {

  renderSquare(i, id, mark) {
     return (
      <Square 
        handleClick={this.props.handleClick}
        piece={this.props.status[i]}
        mark= {mark}
        id= {id}
      />
    );
  }

  render() {
    return (
        <div id="skyStand">
          {this.renderSquare(0, 13, "bench")}
          {this.renderSquare(1, 14, "bench")}
          {this.renderSquare(2, 15, "bench")}
          {this.renderSquare(3, 16, "bench")}
          {this.renderSquare(4, 17, "bench")}
          {this.renderSquare(5, 18, "bench")}
        </div>
    );
  }
}
