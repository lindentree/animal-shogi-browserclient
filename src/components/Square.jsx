import React, { useState } from 'react';

//create your forceUpdate hook
function useForceUpdate() {
    const [value, set] = useState(true); //boolean state
    return () => set(!value); // toggle the state to force render
}

function Square(props) {
   let param = props.piece

   useForceUpdate(param);

   if (param === undefined || param === null ) {
     return (
     
     <div onClick={props.handleClick} >
      <button 
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
}

export default Square;