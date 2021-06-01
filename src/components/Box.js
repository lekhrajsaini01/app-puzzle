import React from 'react';
import Hero from './images/hero.jpg';
import white from './images/white.png';

const Box = (props) => {
   const cls = props.value === 0
        ? 'square zero'
        : 'square';
    return (
         props.value === 0 
         ? <img className={cls}   onClick = {() => props.clickHandler()} alt='Player' style={{width:60, height:60}} src={Hero} />  /* For Hero's Boxes */
         : <img className={cls}   onClick = {() => props.clickHandler()} style={{width:60, height:60}} alt={props.value} src={white} /> /* For white Boxes */
    
    );
};

export default Box;