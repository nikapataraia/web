import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/data'
import maps from './data/maps'
import Game_container from './Game_container';
import images from './assets/images'
import Modalpopup from './Modal_popup';
import Moneychangeanimation from './Moenychangeanimation';
import audios from './assets/Audiomanager';
function App() {
const [Credit,SetCredit] = useState<number>(9999);
const [sidemenuactive,setsidemenuactive]  = useState<boolean>(false)
const [indebt,setindebt] = useState<boolean>(false)
const [volumeon,setvolumeon] = useState<boolean>(true)

const [modalpoped , setmodalpoped] = useState<boolean>(false)
const [modaltext,setmodaltext] = useState<string>('')
const [modal_showbetlimits, setmodal_showbetlimits] = useState<boolean>(false)
const [modal_name,setmodal_name] = useState<string>('')

const [won,setwon] = useState<boolean>(false)
const [moneyanimationvisible , setmoneyanimationvisible] = useState<boolean>(false)
const [lastprize,setlastprize] = useState<number>(0)



const Addtocredit = (num : number) => {
  const winAudio = new Audio(audios.Cashout_audio);
  winAudio.play();
  SetCredit(Credit + num)
  setwon(true)
  setTimeout(() => {
  setlastprize(parseFloat(num.toFixed(2)))
  setmoneyanimationvisible(true)
  setTimeout(() => {
    setmoneyanimationvisible(false);
  }, 1000);},300)
}

const playloseAudio = () => {
const loseAudio = new Audio(audios.Lose_audio);
  loseAudio.play();}

const Subfromcredit = (num : number) => {
  if(Credit - num < 0) {
    alert("you are in debt")
    setindebt(true)
  }
  setTimeout(() => {
    playloseAudio()
  },100)
  SetCredit(Credit - num)
  setwon(false)
  setTimeout(() => {
  setlastprize(parseFloat((-num).toFixed(2)))
  setmoneyanimationvisible(true)
  setTimeout(() => {
    setmoneyanimationvisible(false);
  }, 1000);},300)
}


const pop_modal = (name : string, text : string, showbetlimits : boolean) =>{
setmodal_name(name)
setmodaltext(text)
setmodalpoped(true)
setmodal_showbetlimits(showbetlimits)
}


  return (
    <div className="App">
      <Moneychangeanimation won ={won} isvisible ={moneyanimationvisible} amount={lastprize}></Moneychangeanimation>
      <Modalpopup 
      text={modaltext} 
      showbetlimits ={modal_showbetlimits} 
      modalpoped ={modalpoped}
      name={modal_name}
      setmodalpoped={setmodalpoped}></Modalpopup>
      <div className={`background-blurer ${modalpoped ? 'background-blurer-active' : ''}`}
      onClick={() => {setmodalpoped(false)}}>

      </div>
      <header className="App-header">
        <div className='left'>
          <div className='goal'>
            <img src={images.Goal_icon}></img>
            <p>GOAL</p>
          </div>
          <div className='fair' 
          onClick={() => pop_modal('FAIR' , 'This game uses Provably Fair technology to determine game result. This tool gives you ability to change your seed and check fairness of the game',false)}>
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
          <div className='helper_text' onClick={() => {pop_modal('HOW TO PLAY' , 'There is one bomb in each row of the field. For each successful step your winnings increase. You can cash them out anytime',true)}}>
            <p>How to play?</p>
          </div>
          <div 
          onClick={() => setsidemenuactive(!sidemenuactive)} 
          className='helper_icon'>
            <img src={images.Helper_icon}></img>
          </div>
        </div>
      </header>

      <Game_container 
      addtocredit={Addtocredit} 
      subfromcredit={Subfromcredit} 
      sidemenuactive = {sidemenuactive} 
      Credit = {Credit}
      indebt = {indebt}
      volumeon = {volumeon}
      setvolumeon = {setvolumeon}
      popmodul={pop_modal}>
      </Game_container> 



      
    </div>
  );
}

export default App;
