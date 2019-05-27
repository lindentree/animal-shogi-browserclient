import React from 'react';
import Square from './Square.jsx';


export default class ForestPieceStand extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  renderSquare(i, id) {
     return (
      <Square 
        handleClick={this.props.handleClick}
        piece={this.props.status[i]}
        id= {id}
      />
    );
  }

  render() {

    return (
        <div id="forestStand">
          {this.renderSquare(0, 13)}
          {this.renderSquare(1, 14)}
          {this.renderSquare(2, 15)}
          {this.renderSquare(3, 16)}
          {this.renderSquare(4, 17)}
          {this.renderSquare(5, 18)}
        </div>      
    );
  }
}
