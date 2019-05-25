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
        <div className={"cell " + props.piece.name} xy={props.piece}></div>
      </button>
    </div>
  );
}

export default Square;