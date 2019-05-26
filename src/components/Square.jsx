import React from 'react';

function Square(props) {
   let param = props.piece

   if (param === undefined || param === null ) {
     return (
     
     <div onClick={props.handleClick}>
      <button className={"square img" + props.id} x={props.row}   y={props.col}>
      </button>
    </div>

     )
   }
 

  return (

    <div onClick={props.handleClick}>
      <button className={"square img" + props.id} >
        <div 
          className={"cell " + props.piece.name} 
          name={props.piece.name} 
          x={props.row} 
          y={props.col}
        >
        </div>
      </button>
    </div>
  );
}

export default Square;