import React from 'react';


function Square(props) {
   //console.log('square', props)
   let param = props.piece

   if (param === undefined || param === null ) {
     return <button className={"square img" + props.id}>
       <div className="cell"></div>
    </button>
   }


  return (

  <div onClick={props.handleMove.bind(this, props.row, props.col)}>
    <button className={"square img" + props.id} >
      <div className={"cell " + props.piece.name}></div>
    </button>
  </div>
  );
}

export default Square;