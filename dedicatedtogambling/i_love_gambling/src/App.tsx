import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/data'
import maps from './data/maps'
import Game_container from './Game_container';
import images from './assets/images'
function App() {
const [Credit,SetCredit] = useState<number>(9999.00);

const Addtocredit = (num : number) => {
  SetCredit(Credit + num)
}
const Subfromcredit = (num : number) => {
  if(Credit - num < 0) {
    return
  }
  SetCredit(Credit - num)
}



  return (
    <div className="App">
      <header className="App-header">
        <div className='left'>
          <div className='goal'>
            <img src={images.Goal_icon}></img>
            <p>GOAL</p>
          </div>
          <div className='fair'>
            <img src={images.Shield_icon}></img>
            <p>Probably Fair</p>
          </div>
        </div>

        <div className='mid'>
          <p className='credit_text'>Credit: </p>
          <p className='credit_score'>{Credit.toFixed(2)}</p>
          <p className='credit_currency'>$</p>
        </div>

        <div className='right'>
          <div className='helper_text'>
            <p>How to play?</p>
          </div>
          <div className='helper_icon'>
            <img src={images.Helper_icon}></img>
          </div>
        </div>
      </header>

      <Game_container addtocredit={Addtocredit} subfromcredit={Subfromcredit}>

      </Game_container> 



      
    </div>
  );
}

export default App;
