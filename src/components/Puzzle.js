import React, { Component } from 'react';
import Platform from './Platform'

class Puzzle extends Component {
  state = { platform: [0, 1, 2, 3, 4, 5, 6, 7, 8], size: 3,sprite:[] };
//   for size of game
  componentWillMount() {
    const size = prompt("What size do you want the Background in?")
    if (/^\d+$/.test(size)) {
      this.newGame(size)
    } else {
      alert('Please input a number')
      window.location.href = '/'
    }
  }
  
  isArrayUnique = (arr) => {
    for (let i = 0; i < arr.length; i++){
      if(arr.indexOf(arr[i]) !== i ) return false
    }
    return true
}
//  for new game
  newGame =(size) =>{
    let platform = new Array(size * size);
    let sprite = new Array(size);
    for (let i = 0; i < size * size; ++i)platform[i] = i;


    do {
    for (let x = 0; x < size; x++) {
      sprite[x] = Math.floor(Math.random() * (size*size - 1) + 1)
    }
  }
  while (!this.isArrayUnique(sprite));
    
    console.log(sprite)
    
    const sizee = size -1
    let mid = Math.round(Math.abs((sizee * sizee) / 2))
    let middata = platform[mid]
    let firstdata = platform[0]
    platform[0] = middata
    platform[mid] = firstdata
    this.updatePlatform(platform, size);
    this.setState({ size: size,sprite });
  }
  updatePlatform = (platform) => {
    this.setState({ platform: platform });
  }
  shuffle = (o) => {
    const temp = o.slice();
    for(var j, x, i = temp.length; i; j = Math.floor(Math.random() * i), x = temp[--i], temp[i] = temp[j], temp[j] = x);
    return temp;
  }
  render() {
    return (
      <div className='puzzle'>
        <h1>Save the Princess</h1>
      
        {
          this.state && this.state.platform ? 
            <Platform size={this.state.size} platform={this.state.platform} updatePlatform={this.updatePlatform} sprite={this.state.sprite}/>
            : null
        }
      </div>
    );
  }
}




export default Puzzle;
