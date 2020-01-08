import React from 'react';

const Square = React.memo(props => {
   let param = props.piece;
   let mark = props.mark;
   let pieceImage ="";

   if (mark === undefined || mark === null) {
     mark = "board";
   }

   if (param) {
     pieceImage = `./assets/pieces/${props.piece.name}.png`;
   } 

  return (
     
     <div onClick={props.handleClick} >
      <button
        id={mark} 
        className={"square img" + props.id} 
        x={props.row} 
        y={props.col}>
        <img 
          src={pieceImage} 
          className={"piece"}
        >
        </img> 
      </button>
    </div>

     )
});



export default Square;