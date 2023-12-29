import { useEffect, useState } from 'react';
import data from './data/data';
import audios from './assets/Audiomanager';

interface AutoSettingsProps {
    winincrease: number;
    windecrease: number;
    lossincrease: number;
    lossdecrease: number;
    setwinincrease: React.Dispatch<React.SetStateAction<number>>;
    setwindecrease: React.Dispatch<React.SetStateAction<number>>;
    setlossincrease: React.Dispatch<React.SetStateAction<number>>;
    setlossdecrease: React.Dispatch<React.SetStateAction<number>>;
    selectrandomly : Function;
    canstartgame : boolean;
    setgamestarted : React.Dispatch<React.SetStateAction<boolean>>;
    gamestarted : boolean;
    onwinselected : string;
    setonwinselected: React.Dispatch<React.SetStateAction<string>>;
    onlossselected : string;
    setonlossselected: React.Dispatch<React.SetStateAction<string>>;
    setonwinchange: React.Dispatch<React.SetStateAction<number>>;
    setonlosschange: React.Dispatch<React.SetStateAction<number>>;
    roundstarted : boolean;
  }


  const AutoSettings: React.FC<AutoSettingsProps> = ({
    winincrease,
    windecrease,
    lossincrease,
    lossdecrease,
    setwinincrease,
    setwindecrease,
    setlossincrease,
    setlossdecrease,
    selectrandomly,
    canstartgame,
    setgamestarted,
    gamestarted,
    onwinselected ,
    setonwinselected,
    onlossselected ,
    setonlossselected,
    setonwinchange,
    setonlosschange,
    roundstarted,
  }) => {


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> ,target_setter : React.Dispatch<React.SetStateAction<number>>) => {
      let newValue = parseFloat(e.target.value);
      (newValue > data.max_autochange ? newValue = data.max_autochange : (newValue < data.min_autochange ? newValue = data.min_autochange : newValue = newValue))
      target_setter(newValue)
      e.target.value = newValue.toString()
      setupvalues()
    }

    const setupvalues = () => {
      if (onwinselected === 'base') {
        setonwinchange(0);
      } else if (onwinselected === 'increase') {
        const inputValue = parseFloat((document.getElementById('winincrease') as HTMLInputElement)?.value || '0');
        setonwinchange( inputValue);
      } else if (onwinselected === 'decrease') {
        const inputValue = parseFloat((document.getElementById('windecrease') as HTMLInputElement)?.value || '0');
        setonwinchange(-inputValue);
      }

      if (onlossselected === 'base') {
        setonlosschange(0);
      } else if (onlossselected === 'increase') {
        const inputValue = parseFloat((document.getElementById('lossincrease') as HTMLInputElement)?.value || '0');
        setonlosschange( inputValue);
      } else if (onlossselected === 'decrease') {
        const inputValue = parseFloat((document.getElementById('lossdecrease') as HTMLInputElement)?.value || '0');
        setonlosschange( -inputValue);
      }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const charCode = e.charCode;
      if ((charCode < 48 || charCode > 57) && charCode !== 46) {
        e.preventDefault();
      }
      setupvalues()
    };

    useEffect(() => {
      setupvalues()
    },[onlossselected,onwinselected])

    const handleratiochange = (section: string, selection: string) => {
      if (section === 'onwin') {
        setonwinselected(selection);
      } else if (section === 'onloss') {
        setonlossselected(selection);
      }
    };

    const makeclicksound = () => {
      const clickAudio = new Audio(audios.Click_audio);
      clickAudio.play();
    }

    const makebetsound = () => {
      const clickAudio = new Audio(audios.Bet_audio);
      clickAudio.play();
    }


    return (
      <>
        <div className='game-onwin'>
          <p className='auto-opasitychanger'>On Win</p>
          <div  className="autosettings-innerdiv">
          <div
            className={`making-my-life-harder auto-dovhovers ${onwinselected === 'base' ? 'auto-settings-clickedon' : ''}`}
            onClick={() => {handleratiochange('onwin', 'base');makeclicksound()}}>
              Return To Base
          </div>
          <div
            className={`auto-dovhovers ${onwinselected === 'increase' ? 'auto-settings-clickedon' : ''}`}
            onClick={() => {handleratiochange('onwin', 'increase');makeclicksound()}}
          >
            <p>Increase</p>
            <div>
                <input
                id='winincrease'
                type="text" 
                maxLength={3} 
                defaultValue={winincrease.toString()} 
                onBlur={(e) => handleInputChange(e,setwinincrease)}
                onKeyPress={handleKeyPress}
                pattern="[0-9]*"
                ></input>
                <p className='auto-opasitychanger'>%</p>
            </div>
          </div>
          <div
            className={`auto-dovhovers ${onwinselected === 'decrease' ? 'auto-settings-clickedon' : ''}`}
            onClick={() => {handleratiochange('onwin', 'decrease');makeclicksound()}}>
            <p>Decrease</p>
            <div>
                <input
                id='windecrease'
                type="text" 
                maxLength={3} 
                defaultValue={windecrease.toString()} 
                onBlur={(e) => handleInputChange(e,setwindecrease)}
                onKeyPress={handleKeyPress}
                pattern="[0-9]*"
                ></input>
                <p className='auto-opasitychanger'>%</p>
            </div>
          </div>
          </div>
        </div>


        <div className='game-onloss'>
          <p className='auto-opasitychanger'>On Loss</p>
          <div className="autosettings-innerdiv">
          <div
            className={`making-my-life-harder auto-dovhovers ${onlossselected === 'base' ? 'auto-settings-clickedon' : ''}`}
            onClick={() => {handleratiochange('onloss', 'base');makeclicksound()}}
          >Return To Base</div>
          <div
            className={`auto-dovhovers ${onlossselected === 'increase' ? 'auto-settings-clickedon' : ''}`}
            onClick={() => {handleratiochange('onloss', 'increase');makeclicksound()}}
          >
            <p>Increase</p>
            <div>
                <input
                id='lossincrease'
                type="text" 
                maxLength={3} 
                defaultValue={lossincrease.toString()} 
                onBlur={(e) => handleInputChange(e,setlossincrease)}
                onKeyPress={handleKeyPress}
                pattern="[0-9]*"
                ></input>
                <p className='auto-opasitychanger'>%</p>
            </div>
          </div>
          <div
            className={`auto-dovhovers ${onlossselected === 'decrease' ? 'auto-settings-clickedon' : ''}`}
            onClick={() => {handleratiochange('onloss', 'decrease');makeclicksound()}}
          >
            <p>Decrease</p>
            <div>
                <input
                id='lossdecrease'
                type="text" 
                maxLength={3} 
                defaultValue={lossdecrease.toString()} 
                onBlur={(e) => handleInputChange(e,setlossdecrease)}
                onKeyPress={handleKeyPress}
                pattern="[0-9]*"
                ></input>
                <p className='auto-opasitychanger'>%</p>
            </div>
          </div>
          </div>
        </div>
  
        <button onClick={() => {selectrandomly();makeclicksound()}} 
        className={`game-random
        ${canstartgame ? 'cancel-block-pickers' : ''} `}>
          SELECT RANDOMLY

        </button>
        <button 
        onClick={() => {setgamestarted(!gamestarted)}} 
        className={`game-autostart 
        ${gamestarted ? 'game-autostop' : ''}
        ${canstartgame? 'game-autostart-ready' : ''}
        ${(roundstarted && !gamestarted) ? 'disable-until-roundends' : ''}`}
        >{gamestarted? 'STOP' : 'START'}
        </button>
      </>
    );
  };
  
  export default AutoSettings;