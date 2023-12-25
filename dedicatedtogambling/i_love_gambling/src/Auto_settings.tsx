import { useState } from 'react';
import data from './data/data';

interface AutoSettingsProps {
    winincrease: number;
    windecrease: number;
    lossincrease: number;
    lossdecrease: number;
    setwinincrease: React.Dispatch<React.SetStateAction<number>>;
    setwindecrease: React.Dispatch<React.SetStateAction<number>>;
    setlossincrease: React.Dispatch<React.SetStateAction<number>>;
    setlossdecrease: React.Dispatch<React.SetStateAction<number>>;
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
  }) => {

    const [onwinselected,setonwinselected] = useState<string>("base")
    const [onlossselected,setonlossselected] = useState<string>("base")
    const [readytostart,setreadytostart] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> ,target_setter : React.Dispatch<React.SetStateAction<number>>) => {
      let newValue = parseFloat(e.target.value);
      (newValue > data.max_autochange ? newValue = data.max_autochange : (newValue < data.min_autochange ? newValue = data.min_autochange : newValue = newValue))
      target_setter(newValue)
      e.target.value = newValue.toString()
    }


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const charCode = e.charCode;
    
      if ((charCode < 48 || charCode > 57) && charCode !== 46) {
        e.preventDefault();
      }
    };

    const handleratiochange = (section: string, selection: string) => {
      if (section === 'onwin') {
        setonwinselected(selection);
      } else if (section === 'onloss') {
        setonlossselected(selection);
      }
    };

    return (
      <>
        <div className='game-onwin'>
          <p className='auto-opasitychanger'>On Win</p>
          <div  className="autosettings-innerdiv">
          <div
            className={`making-my-life-harder auto-dovhovers ${onwinselected === 'base' ? 'auto-settings-clickedon' : ''}`}
            onClick={() => handleratiochange('onwin', 'base')}>
              Return To Base
          </div>
          <div
            className={`auto-dovhovers ${onwinselected === 'increase' ? 'auto-settings-clickedon' : ''}`}
            onClick={() => handleratiochange('onwin', 'increase')}
          >
            <p>Increase</p>
            <div>
                <input
                id='bet-input'
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
            onClick={() => handleratiochange('onwin', 'decrease')}>
            <p>Decrease</p>
            <div>
                <input
                id='bet-input'
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
            onClick={() => handleratiochange('onloss', 'base')}
          >Return To Base</div>
          <div
            className={`auto-dovhovers ${onlossselected === 'increase' ? 'auto-settings-clickedon' : ''}`}
            onClick={() => handleratiochange('onloss', 'increase')}
          >
            <p>Increase</p>
            <div>
                <input
                id='bet-input'
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
            onClick={() => handleratiochange('onloss', 'decrease')}
          >
            <p>Decrease</p>
            <div>
                <input
                id='bet-input'
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
  
        <button className='game-random'>
          SELECT RANDOMLY
        </button>
        <button className={`game-autostart ${readytostart ? 'game-autostart-ready' : ''}`}>
          START
        </button>
      </>
    );
  };
  
  export default AutoSettings;