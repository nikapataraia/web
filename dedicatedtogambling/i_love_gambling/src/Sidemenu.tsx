import images from "./assets/images";
import data from "./data/data";

interface sidemenuprops {
    sidemenuactive : boolean;
    volumeon : boolean;
    setvolumeon : React.Dispatch<React.SetStateAction<boolean>>;
    popmodul : Function;
}

const Sidemenu: React.FC<sidemenuprops> = ({sidemenuactive,volumeon,setvolumeon,popmodul}) => {

    return (<aside className={`${sidemenuactive?'sidemenuactive' : ''} sidemenu`}>
        <div className={`innersidemenu ${sidemenuactive ? 'inneractive' : ''}`}>
            <div>
            <div className="sidemenuvolume">
                <div>
                <img src={images.Volume_icon}></img>
                <p>Volume</p>
                </div>
                <img 
                className="Volume-switch" 
                src={`${volumeon ? images.Button_icon_on : images.Button_icon_off}`}
                onClick={() => setvolumeon(!volumeon)}></img>
            </div>
            <div 
            onClick={() => popmodul('FAIR' , 'This game uses Provably Fair technology to determine game result. This tool gives you ability to change your seed and check fairness of the game',false)}
            className="sidemenufair sidemenuitem">
                <img src={images.Scale_icon}></img>
                <p>Probably Fair</p>
            </div>
            <div className="sidemenufreebets sidemenuitem">
                <img src={images.Star_icon}></img>
                <p>Free Bets</p>
            </div>
            <div 
            onClick={() => {popmodul('HOW TO PLAY' , 'There is one bomb in each row of the field. For each successful step your winnings increase. You can cash them out anytime',true)}}
            className="sidemenuhowtoplay sidemenuitem">
                <img src={images.Questionmark_icon}></img>
                <p>How To Play</p>
            </div>
            </div>
            <div className="sidemenu-bottom">
                <div className="sidemenu-bottom-goalholder">
                    <img src={images.Goal_icon}></img>
                    <p>GOAL</p>
                </div>
                <div>
                    © Spribe
                </div>
            </div>
        </div>
    </aside>)
}

export default Sidemenu