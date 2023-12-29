import React, { ReactNode, Dispatch, SetStateAction, useState, useEffect } from 'react';
import data from './data/data';
import AutoSettings from './Auto_settings';
import Gamemap from './Game_map';
import GameBet from './Game_bet';
import GameFieldselect from './Game_fieldselect'
import Sidemenu from './Sidemenu';
import maps from './data/maps';
import audios from './assets/Audiomanager';

export interface GameProps {
  addtocredit: Function;
  subfromcredit: Function;
  sidemenuactive : boolean;
  Credit:number;
  indebt : boolean;
  volumeon : boolean;
  setvolumeon : React.Dispatch<React.SetStateAction<boolean>>;
  popmodul : Function
}

export default function Game_container({ 
  addtocredit, 
  subfromcredit,
  sidemenuactive,
  Credit, 
  indebt,
  volumeon,
  setvolumeon,
  popmodul,
  children }: React.PropsWithChildren<GameProps>) {
  const [ismanual, setismanual] = React.useState(true);
  const [betamount,setbetamount] = useState<number>(2.00);
  const [activefield,setactivefield] = useState<string>('Medium');

  const [winincrease , setwinincrease] = useState<number>(100);
  const [windecrease,setwindecrease] = useState<number>(50);
  const [lossincrease , setlossincrease] = useState<number>(100);
  const [lossdecrease,setlossdecrease] = useState<number>(50);

  const [gamestarted,setgamestarted] = useState<boolean>(false);
  const [selectionphase,setselectionphase] = useState<boolean>(false)

  const [buttonispressed, setbuttonispressed] = useState<number>(-1)

// additional consts for auto gameplay
  const [selectrandomlypressed, setselectrandomlypressed] = useState<boolean>(false)
  const [canstartgame , setcanstartgame] = useState<boolean>(false)
  const [onwinselected,setonwinselected] = useState<string>("base")
  const [onwinchange,setonwinchange] = useState<number>(0)
  const [onlossselected,setonlossselected] = useState<string>("base")
  const [onlosschange,setonlosschange] = useState<number>(0)
  const [roundstarted,setroundstarted] = useState<boolean>(false)

  React.useEffect(() => {
    const updateBodyStyles = () => {
      document.body.style.height = ismanual ? '100%' : 'auto';
      if (window.innerWidth <= 960) {
      } else {
      }
    };
    updateBodyStyles();
    window.addEventListener('resize', updateBodyStyles);
    return () => {
      window.removeEventListener('resize', updateBodyStyles);
      document.body.style.height = 'auto';
    };
  }, [ismanual]);


  const geteverythingtodefault1 = () => {
    setbuttonispressed(-1)
    setcanstartgame(false)
    setselectrandomlypressed(false)
    setgamestarted(false)
    setselectionphase(false)
    clearmap()
  }

  const clearblock = (index: number, columnindex: number) => {
    const gridContainer = document.querySelector('.map-gridcontainer');
  if (gridContainer) {
    const columnElements = gridContainer.children;
    if (columnElements[columnindex]) {
      const blockElement = columnElements[columnindex].children[index] as HTMLDivElement | undefined;
      if(blockElement){
        const imageElement = blockElement.children[0] as HTMLImageElement | undefined;
      if (imageElement) {
        imageElement.remove();
      }
      }
    }
  }
  }

  const clearmap = () => {
    for(let i = 0; i < maps[activefield].columns ; i++){
      for(let j = 0; j < maps[activefield].rows ; j++){
        clearblock(j,i)
      }
    }
  }

  useEffect(() => {
    geteverythingtodefault1()
  }, [ismanual,activefield]);


  const selectrandomly = () => {
    setselectrandomlypressed(!selectrandomlypressed)
  }

  const disablesettings = () => {
    const leftside = document.querySelector('.game-settings') as HTMLElement | null;
    if (leftside) {
      leftside.style.pointerEvents = 'none';
      leftside.style.opacity = '0.5';
    }
  };
  
  const enablesettings = () => {
    const leftside = document.querySelector('.game-settings') as HTMLElement | null;
    if (leftside) {
      leftside.style.pointerEvents = 'auto';
      leftside.style.opacity = '1';
    }
  };

  const checkifenoughmoney = () => {
    if(Credit <= 0){
     alert("pay us back first")
     setbetamount(0) 
     return
    }
    if(betamount > Credit){
        alert("not enough Credits")
        setbetamount(Credit)
        return
      }
    
  }

  const makeclicksound = () => {
    const clickAudio = new Audio(audios.Click_audio);
    clickAudio.play();
  }

  const makebetsound = () => {
    const clickAudio = new Audio(audios.Bet_audio);
    clickAudio.play();
  }
  const [gameended,setgameended] = useState(false)
  useEffect(() => {
    setgameended(!gamestarted)
  },[gamestarted])
  useEffect(() => {
    setgameended(roundstarted)
  },[roundstarted])

  return (
    <div className="Game-container">
        {/* leftside */}
      <div className={`game-settings 
      ${(!ismanual && roundstarted) || (ismanual && gamestarted) ? 'disable-settings': ''}`}>
        {/* game type */}
        <div className='game-type'>
            <div className={`manual ${ismanual ? 'active-type' : ''}`} onClick={() => {setismanual(true);makeclicksound()}}>Manual</div>
            <div className={`auto ${!ismanual ? 'active-type' : ''}`} onClick={() => {setismanual(false);makeclicksound()}}>Auto</div>
        </div> 

        <GameBet setbetamount={setbetamount} betamount={betamount}></GameBet>
        {/* FIELD SELECT */}
        <GameFieldselect setactivefield = {setactivefield} activefield = {activefield}></GameFieldselect>


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
          selectrandomly={selectrandomly}
          canstartgame = {canstartgame}
          gamestarted = {gamestarted}
          setgamestarted={setgamestarted}
          onwinselected ={onwinselected}
          setonwinselected = {setonwinselected}
          onlossselected = {onlossselected}
          setonlossselected={setonlossselected}
          setonwinchange={setonwinchange}
          setonlosschange={setonlosschange}
          roundstarted = {roundstarted}
        />: null}

{/* additional settings/buttons when playing manual */}

        {ismanual ? <button onClick={() => {setgamestarted(true);
          disablesettings();
          checkifenoughmoney();
          setbuttonispressed(buttonispressed + 1);
           makebetsound()}} className='game-manualbet'>BET</button> : null}
      </div>




      {/* rightside */}
      <div className="game-map">
        
        <Gamemap 
        map_size={activefield} 
        ismanual = {ismanual} 
        gamestarted = {gamestarted} 
        setgamestarted = {setgamestarted}
        selectionphase = {selectionphase}
        setselectionphase = {setselectionphase}
        addtocredit={addtocredit}
        subfromcredit={subfromcredit}
        betamount = {betamount}
        enablesettings = {enablesettings}
        buttonispressed = {buttonispressed}
        selectrandomlypressed = {selectrandomlypressed}
        setselectrandomlypressed = {setselectrandomlypressed}
        selectrandomly = {selectrandomly}
        canstartgame = {canstartgame}
        setcanstartgame = {setcanstartgame}
        onwinchange = {onwinchange}
        onlosschange = {onlosschange}
        setbetamount = {setbetamount}
        setroundended = {setroundstarted}
        ></Gamemap>
      </div>
 
      <Sidemenu 
      sidemenuactive = {sidemenuactive}
      volumeon = {volumeon}
      setvolumeon={setvolumeon}
      popmodul={popmodul}
      ></Sidemenu>

      {children}
    </div>
  );
}