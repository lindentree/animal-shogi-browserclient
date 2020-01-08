import React from 'react';

const Square = React.memo(props => {
   let param = props.piece;
   let mark = props.mark;

   if (mark === undefined || mark === null) {
     mark = "board";
   }

   if (param === undefined || param === null ) {
     return (
     
     <div onClick={props.handleClick} >
      <button
        id={mark} 
        className={"square img" + props.id} 
        x={props.row} 
        y={props.col}>
      </button>
    </div>

     )
   } else {
     return (

      <div onClick={props.handleClick} >
        <button className={"square img" + props.id} >
          <div
            id={mark}
            className={props.piece.name} 
            name={props.piece.name} 
            x={props.row} 
            y={props.col}
         >
        </div>
      </button>
    </div>
  );

   }
});



export default Square;