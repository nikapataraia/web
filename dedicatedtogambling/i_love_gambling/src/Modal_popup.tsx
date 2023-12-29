import images from "./assets/images";
import data from "./data/data";

interface Modalprops {
    text :string;
    showbetlimits : boolean;
    modalpoped : boolean;
    name : string
    setmodalpoped : React.Dispatch<React.SetStateAction<boolean>>;
}

const Modalpopup: React.FC<Modalprops> = ({
    text,showbetlimits,modalpoped,name,setmodalpoped
}) => {
    return <div className={`Modal_popup ${modalpoped ? 'modal-active' : ''}`}>
        <div className="modal-top">
            <p>{name.toUpperCase()}</p>
            <button onClick={() => setmodalpoped(false)}>x</button>
        </div>
        <div className="modal-img">
            <img src={images.Field_icon}></img>
        </div>
        <div className="modal-text">
            {text}
        </div>
        {showbetlimits ? 
        <div className="modal-betlimits">
            <div style={{ backgroundColor: '#0e1119' }}>
                <p>Min. Bet:</p>
                <p>{data.min_bet}</p>
            </div>
            <div>
                <p>Max. Bet:</p>
                <p>{data.max_bet}</p>
            </div>
        </div> 
        : null}
        <div className="modul-gotitbutton">
            <button onClick={() => setmodalpoped(false)}>Got It</button>
        </div>
    </div>
}

export default Modalpopup