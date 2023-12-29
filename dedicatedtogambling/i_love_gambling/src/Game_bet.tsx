import { ChangeEvent } from "react";
import data from "./data/data";
import audios from "./assets/Audiomanager";

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

    const makeclicksound = () => {
      const clickAudio = new Audio(audios.Click_audio);
      clickAudio.play();
    }


    const setbetamountto = (num : number) => {
      setbetamount(num);
      const inputElement = document.getElementById('bet-input') as HTMLInputElement;
      inputElement.value = num.toFixed(2);
    }
  

    return (
      <div className='game-bet'>
        <div className='game-bet-left'>
          <p>Bet amount $</p>
          <div className='bet-container'>
            <button onClick={() => {subfrombet(0.1);makeclicksound()}}>-</button>
            <input
              id='bet-input'
              type='text'
              maxLength={6}
              defaultValue={betamount.toFixed(2).toString()}
              onBlur={handleInputChange}
              onKeyPress={handleKeyPress}
              pattern="[0-9]*"
            ></input>
            <button onClick={() => {addtobet(0.1) ; makeclicksound()}}>+</button>
          </div>
        </div>
        <div className='game-bet-right'>
          <div onClick={() => {setbetamountto(1);makeclicksound()}}>1 $</div>
          <div onClick={() => {setbetamountto(3);makeclicksound()}}>3 $</div>
          <div onClick={() => {setbetamountto(5);makeclicksound()}}>5 $</div>
          <div onClick={() => {setbetamountto(10);makeclicksound()}}>10 $</div>
        </div>
      </div>
    );
  };
  
  export default GameBet;