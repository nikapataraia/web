import { useEffect, useState } from "react";
import maps from "./data/maps";
import images from "./assets/images";

interface ArrowContainerProps {
    oncolumn: number;
    ismanual: boolean;
    activefield : string;
    gamestarted : boolean;
    inblockselect : boolean
  }
  
  const Arrowcontainer: React.FC<ArrowContainerProps> = ({oncolumn,ismanual,activefield,gamestarted,inblockselect}) => {
    const [fieldlength,setfieldlength] = useState(maps[activefield].columns)

    useEffect(() => {
        setfieldlength(maps[activefield].columns)
    },[activefield])


    const renderArrowDivs = () => {
        let columnWidth = `calc(${100/fieldlength}% - 6px)`
        return Array.from({ length: fieldlength }, (_, index) => (
          <div 
          key={index} 
          className={`arrow-div ${((ismanual && oncolumn == index && gamestarted)||(!ismanual && inblockselect && oncolumn == index) ) ? 'active-arrow-div' : ''}`}
          style={{ width: columnWidth }}>
            <img src={images.Arrow_icon}></img>
          </div>
        ));
      };
    return <div className="Arrowcontainer">
        {renderArrowDivs()}
    </div>
}

export default Arrowcontainer