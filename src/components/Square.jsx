import React from 'react';

function Square(props) {
   let param = props.piece

   if (param === undefined || param === null ) {
     return (
     
     <div onClick={props.handleClick}>
      <button className={"square img" + props.id} >
        <div className="cell"></div>
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
          x={props.piece.position[0]} 
          y={props.piece.position[1]}
        >
        </div>
      </button>
    </div>
  );
}

export default Square;