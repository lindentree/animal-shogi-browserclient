import React from 'react';
import Board from './Board.jsx';
import SkyPieceStand from './SkyPieceStand.jsx';
import ForestPieceStand from './ForestPieceStand.jsx';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <div className="sky">
        <SkyPieceStand status={this.props.skystand} handleClick={this.props.handleClick}/>
      </div>
      <div className="game-board">
        <Board status={this.props.status} handleMove={this.props.handleMove} handleClick={this.props.handleClick}/>
      </div>
      <div className="forest">
        <ForestPieceStand status={this.props.foreststand} handleClick={this.props.handleClick}/>
      </div>
      
    </div>
    );
  }
}




