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
      <div className="shell">
        <SkyPieceStand status={this.props.skystand} handleClick={this.props.handleClick}/>
        <Board status={this.props.status} handleMove={this.props.handleMove} handleClick={this.props.handleClick}/>
        <ForestPieceStand status={this.props.foreststand} handleClick={this.props.handleClick}/> 
        </div>  
    );
  }
}




