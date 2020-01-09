import React from 'react';

const Square = React.memo(props => {

   let param = props.piece;
   let mark = props.mark;
   let pieceImage = "";
   let pieceName = null;


   if (mark === undefined || mark === null) {
     mark = "board";
   }

   if (param) {
    
     pieceImage = `./assets/pieces/${props.piece.name}.png`;
     pieceName = props.piece.name;
   } 

  return (
     
     <div onClick={props.handleClick}>
      <button 
        id={mark}
        className={"square img" + props.id} 
        x={props.row} 
        y={props.col}
      >
        <img 
          style={{visibility: param ? 'visible' : 'hidden' }}
          id={mark}
          name={pieceName}
          src={pieceImage} 
          className={"piece"}
          x={props.row} 
          y={props.col}
        >
        </img> 
      </button>
    </div>

     )
});

export default Square;