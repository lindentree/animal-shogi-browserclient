import React from 'react';
import Square from './Square.jsx';

const SkyPieceStand = React.memo(props => {

  const renderSquare = (i, id, mark) => {
    return (
      <Square 
        handleClick={props.handleClick}
        piece={props.status[i]}
        mark= {mark}
        id= {id}
      />
    );
  }

  return (
    <div id="skyStand">
      {renderSquare(0, 13, "bench")}
      {renderSquare(1, 14, "bench")}
      {renderSquare(2, 15, "bench")}
      {renderSquare(3, 16, "bench")}
      {renderSquare(4, 17, "bench")}
      {renderSquare(5, 18, "bench")}
    </div>
  );
});

export default SkyPieceStand;