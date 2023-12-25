import { ChangeEvent } from "react";
import data from "./data/data";

interface GameBetProps {
    betamount: number;
    setbetamount : React.Dispatch<React.SetStateAction<number>>;
  }
  
  const GameBet: React.FC<GameBetProps> = ({
    betamount,
    setbetamount,
  }) => {
    const addtobet = (num : number) => {
        let newBetAmount = betamount + num;
      if (newBetAmount > data.max_bet) {
        newBetAmount = data.max_bet;
      }
      setbetamount(newBetAmount);
      const inputElement = document.getElementById('bet-input') as HTMLInputElement;
      inputElement.value = newBetAmount.toFixed(2);
      }
    
      const subfrombet = (num : number) => {
        let newBetAmount = betamount - num;
      if (newBetAmount < data.min_bet) {
        newBetAmount = data.min_bet;
      }
      setbetamount(newBetAmount);
      const inputElement = document.getElementById('bet-input') as HTMLInputElement;
      inputElement.value = newBetAmount.toFixed(2);
      }
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        let newBetAmount = (isNaN(newValue) ? data.min_bet : (newValue > data.max_bet ? data.max_bet : (newValue < data.min_bet ? data.min_bet : newValue)));
        setbetamount(newBetAmount)
        const inputElement = document.getElementById('bet-input') as HTMLInputElement;
        inputElement.value = newBetAmount.toFixed(2);
      };
    
      const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const charCode = e.charCode;
    
      if ((charCode < 48 || charCode > 57) && charCode !== 46) {
        e.preventDefault();
      }
    };


    return (
      <div className='game-bet'>
        <div className='game-bet-left'>
          <p>Bet amount $</p>
          <div className='bet-container'>
            <button onClick={() => subfrombet(0.1)}>-</button>
            <input
              id='bet-input'
              type='text'
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
      </div>
    );
  };
  
  export default GameBet;