import React, { ReactNode, Dispatch, SetStateAction, useState } from 'react';
import data from './data/data';
import AutoSettings from './Auto_settings';
import Gamemap from './Game_map';
import GameBet from './Game_bet';

export interface GameProps {
  addtocredit: Function;
  subfromcredit: Function;
}

export default function Game_container({ addtocredit, subfromcredit, children }: React.PropsWithChildren<GameProps>) {
  const [ismanual, setismanual] = React.useState(true);
  const [betamount,setbetamount] = useState<number>(2.00);
  const [activefield,setactivefield] = useState<string>('Medium');

  const [winincrease , setwinincrease] = useState<number>(100);
  const [windecrease,setwindecrease] = useState<number>(50);
  const [lossincrease , setlossincrease] = useState<number>(100);
  const [lossdecrease,setlossdecrease] = useState<number>(50);

  

  
  // BET CHANGING
//   const addtobet = (num : number) => {
//     let newBetAmount = betamount + num;
//   if (newBetAmount > data.max_bet) {
//     newBetAmount = data.max_bet;
//   }
//   setbetamount(newBetAmount);
//   const inputElement = document.getElementById('bet-input') as HTMLInputElement;
//   inputElement.value = newBetAmount.toFixed(2);
//   }

//   const subfrombet = (num : number) => {
//     let newBetAmount = betamount - num;
//   if (newBetAmount < data.min_bet) {
//     newBetAmount = data.min_bet;
//   }
//   setbetamount(newBetAmount);
//   const inputElement = document.getElementById('bet-input') as HTMLInputElement;
//   inputElement.value = newBetAmount.toFixed(2);
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = parseFloat(e.target.value);
//     let newBetAmount = (isNaN(newValue) ? data.min_bet : (newValue > data.max_bet ? data.max_bet : (newValue < data.min_bet ? data.min_bet : newValue)));
//     setbetamount(newBetAmount)
//     const inputElement = document.getElementById('bet-input') as HTMLInputElement;
//     inputElement.value = newBetAmount.toFixed(2);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//   const charCode = e.charCode;

//   if ((charCode < 48 || charCode > 57) && charCode !== 46) {
//     e.preventDefault();
//   }
// };

// Field changing

const handleFieldClick = (newfield : string) => {
  setactivefield(newfield)
}



  return (
    <div className="Game-container">
        {/* leftside */}
      <div className="game-settings">
        <div className='game-type'>
            <div className={`manual ${ismanual ? 'active-type' : ''}`} onClick={() => setismanual(true)}>Manual</div>
            <div className={`auto ${!ismanual ? 'active-type' : ''}`} onClick={() => setismanual(false)}>Auto</div>
        </div> 

        {/* <div className='game-bet'>
            <div className='game-bet-left'>
                <p>Bet amount $</p>
                <div className='bet-container'>
                    <button onClick={() => subfrombet(0.1)}>-</button>
                    <input 
                    id='bet-input'
                    type="text" 
                    maxLength={6} 
                    defaultValue={betamount.toFixed(2).toString()} 
                    onBlur={handleInputChange}
                    onKeyPress={handleKeyPress}
                    pattern="[0-9]*"
                    ></input>
                    <button onClick={() => addtobet(0.1)}>+</button>
                </div>
            </div>
            <div className='game-bet-right'>
                <div onClick={() => addtobet(1)}>1 $</div>
                <div onClick={() => addtobet(3)}>3 $</div>
                <div onClick={() => addtobet(5)}>5 $</div>
                <div onClick={() => addtobet(10)}>10 $</div>
            </div>
        </div> */}
        <GameBet setbetamount={setbetamount} betamount={betamount}></GameBet>


        {/* FIELD SELECT */}
        <div className='field-select'>
          <p>Field size</p>
          <div className='field-container'>
            <div 
            onClick={() => handleFieldClick('Small')}
            className={`field-option ${activefield === 'Small' ? 'active-field' : ''}`}
            >Small</div>

            <div 
            onClick={() => handleFieldClick('Medium')}
            className={`field-option ${activefield === 'Medium' ? 'active-field' : ''}`}
            >Medium</div>

            <div 
            onClick={() => handleFieldClick('Big')}
            className={`field-option ${activefield === 'Big' ? 'active-field' : ''}`}
            >Big</div>
          </div>
        </div>


{/* additional settings/buttons when playing auto */}
        {!ismanual ? <AutoSettings
          winincrease={winincrease}
          windecrease={windecrease}
          lossincrease={lossincrease}
          lossdecrease={lossdecrease}
          setwinincrease={setwinincrease}
          setwindecrease={setwindecrease}
          setlossincrease={setlossincrease}
          setlossdecrease={setlossdecrease}
        />: null}

{/* additional settings/buttons when playing manual */}
        {ismanual ? <button className='game-manualbet'>BET</button> : null}
      </div>

      {/* rightside */}


      <div className="game-map">
        <Gamemap map_size={activefield}></Gamemap>
      </div>

      {children}
    </div>
  );
}