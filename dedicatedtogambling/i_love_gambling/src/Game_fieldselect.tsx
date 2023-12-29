import audios from "./assets/Audiomanager";

interface GameFieldProps {
    setactivefield : React.Dispatch<React.SetStateAction<string>>;
    activefield : string;
  }

const GameFieldselect: React.FC<GameFieldProps> = ({
    setactivefield,
    activefield,
  }) => {
    const handleFieldClick = (newfield : string) => {
        setactivefield(newfield)
      }
      const makeclicksound = () => {
        const clickAudio = new Audio(audios.Click_audio);
        clickAudio.play();
      }
    return (
        <div className='field-select'>
          <p>Field size</p>
          <div className='field-container'>
            <div 
            onClick={() => {handleFieldClick('Small');makeclicksound()}}
            className={`field-option ${activefield === 'Small' ? 'active-field' : ''}`}
            >Small</div>

            <div 
            onClick={() => {handleFieldClick('Medium');makeclicksound()}}
            className={`field-option ${activefield === 'Medium' ? 'active-field' : ''}`}
            >Medium</div>

            <div 
            onClick={() => {handleFieldClick('Big');makeclicksound()}}
            className={`field-option ${activefield === 'Big' ? 'active-field' : ''}`}
            >Big</div>
          </div>
        </div>

    )
  }

  export default  GameFieldselect