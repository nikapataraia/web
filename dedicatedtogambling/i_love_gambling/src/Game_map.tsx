import React, { useEffect, useState } from 'react';
import Map from './models/map';
import maps from './data/maps';
import images from './assets/images';
import Gamemap_manual from './GameMap_manual';
import Gamemap_auto from './GameMap_auto';
import Arrowcontainer from './Arrow_container';

interface Gamemapinterface {
  map_size : string;
  ismanual : boolean
  gamestarted : boolean;
  setgamestarted : React.Dispatch<React.SetStateAction<boolean>>;
  selectionphase : boolean;
  setselectionphase : React.Dispatch<React.SetStateAction<boolean>>;
  addtocredit: Function;
  subfromcredit: Function;
  betamount : number;
  enablesettings : Function;
  buttonispressed : number;
  selectrandomlypressed : boolean;
  setselectrandomlypressed : React.Dispatch<React.SetStateAction<boolean>>;
  selectrandomly : Function;
  canstartgame:boolean;
  setcanstartgame : React.Dispatch<React.SetStateAction<boolean>>;
  onwinchange :number
  onlosschange : number
  setbetamount:React.Dispatch<React.SetStateAction<number>>;
  setroundended:React.Dispatch<React.SetStateAction<boolean>>;
  volumeon : boolean;

}

const generatebombs = (setbomblocation : React.Dispatch<React.SetStateAction<number[]>>, mapwidth:number, mapheight:number) => {
  const bomblocations = []
  for(let i = 0; i < mapwidth; i++){
    bomblocations.push(Math.floor(Math.random() * mapheight))
  }
  setbomblocation(bomblocations)
}







const Gamemap: React.FC<Gamemapinterface> = ({ map_size , ismanual , gamestarted, 
  setgamestarted, selectionphase, setselectionphase , addtocredit, 
  subfromcredit,betamount ,enablesettings,buttonispressed,
  selectrandomlypressed,setselectrandomlypressed,selectrandomly,
  canstartgame,setcanstartgame,onwinchange,onlosschange,setbetamount,setroundended,volumeon
}) => {
  const mymap = maps[map_size]
  const [oncolumn,setoncolumn] = useState<number>(0)
  const [bomblocations,setbomblocation] = useState<number[]>([])
  const [wasboxchosen, setwasboxchosen] = useState<boolean>(false)
  const [chosenboxids,setchosenboxids] = useState<number[]>([])
  const [lastballindex, setlastballindex] = useState<number>(-1)
  const [islost,setislost] = useState<boolean>(false)

  useEffect(() => {
    generatebombs(setbomblocation, mymap.columns, mymap.rows);
  }, [mymap]);


  const geteverythingtodefault2 = () => {
    setselectionphase(!ismanual)
    setoncolumn(0)
    generatebombs(setbomblocation, mymap.columns, mymap.rows);
    setchosenboxids([])
    setlastballindex(-1)
    setislost(false)
    setwasboxchosen(false)
  }

  useEffect(() => {
      geteverythingtodefault2()
  },[ismanual,map_size])

  useEffect(() => {
    resetmap()
  },[buttonispressed])



  // money manager and map manipulation functions.
  const cashout = (multipl : number, betamount : number) => {
    addtocredit(multipl * betamount)
  }

  const takeawaymoney = (multipl : number, betamount : number) => {
    subfromcredit(multipl * betamount)
  }
  
  const placeballon = (index: number, columnindex: number) => {
    setlastballindex(index);
    const gridContainer = document.querySelector('.map-gridcontainer');
    if (gridContainer) {
      const columnElements = gridContainer.children;
      if (columnElements[columnindex]) {
        const blockElement = columnElements[columnindex].children[index] as HTMLDivElement;
        const ballElement = document.createElement('img');
        ballElement.src = images.Ball_icon;
        ballElement.alt = 'Place Ball';
        ballElement.className = 'map-blockimages';
        blockElement.appendChild(ballElement);
      }
      if (columnindex > 0) {
        removeball(lastballindex, columnindex - 1);
      }
    };
  };
  
  const removeball = (index: number, columnindex: number) => {
    const gridContainer = document.querySelector('.map-gridcontainer');
    if (gridContainer) {
      const columnElements = gridContainer.children;
      if (columnElements[columnindex]) {
        const blockElement = columnElements[columnindex].children[index] as HTMLDivElement;
        const ballElement = blockElement.children[0] as HTMLImageElement | undefined;
        if (ballElement) {
          ballElement.remove();
        }
      }
    }
  };
  
  const revealbombon = (index: number, columnindex: number) => {
    const gridContainer = document.querySelector('.map-gridcontainer');
    if (gridContainer) {
      const columnElements = gridContainer.children;
      if (columnElements[columnindex]) {
        const blockElement = columnElements[columnindex].children[index] as HTMLDivElement;
        const bombElement = document.createElement('img');
        bombElement.src = images.Bomb_icon;
        bombElement.alt = 'Reveal Bomb';
        bombElement.className = 'map-blockimages';
        blockElement.appendChild(bombElement);
      }
    }
  };
  
  const explodebombon = (index: number, columnindex: number) => {
    const gridContainer = document.querySelector('.map-gridcontainer');
    if (gridContainer) {
      const columnElements = gridContainer.children;
      if (columnElements[columnindex]) {
        const blockElement = columnElements[columnindex].children[index] as HTMLDivElement;
        const explosionElement = document.createElement('img');
        explosionElement.src = images.Explosion_icon;
        explosionElement.alt = 'Explode Bomb';
        explosionElement.className = 'map-blockimages';
        blockElement.appendChild(explosionElement);
      }
    }
    if (columnindex > 0) {
      removeball(lastballindex, columnindex - 1);
    }
  };

  const placeflag = (index: number, columnindex: number) => {
    setlastballindex(index);
    const gridContainer = document.querySelector('.map-gridcontainer');
    if (gridContainer) {
      const columnElements = gridContainer.children;
      if (columnElements[columnindex]) {
        const blockElement = columnElements[columnindex].children[index] as HTMLDivElement;
        const ballElement = document.createElement('img');
        ballElement.src = images.Flag_icon;
        ballElement.alt = 'Place Flap';
        ballElement.className = 'map-blockimages';
        blockElement.appendChild(ballElement);
      }
    };
  };

  const resetmap = () => {
    setoncolumn(0)
    generatebombs(setbomblocation, mymap.columns, mymap.rows)
    setislost(false)
    setlastballindex(-1)
    const gridContainer = document.querySelector('.map-gridcontainer');
    if (gridContainer) {
    const columnElements = gridContainer.children;
    if (columnElements) {
      Array.from(columnElements).forEach((columnElement) => {
        if (columnElement instanceof HTMLElement) {
          Array.from(columnElement.children).forEach((mapblock) => {
             const imageelement = mapblock.children[0] as HTMLImageElement | undefined;
             if(imageelement){
              imageelement.remove()
             }
          });
        }
      });
      }
    }
};
const choosebox = (id : number) => {
  setwasboxchosen(true)
  setchosenboxids((prevIds) => [...prevIds, id]);
  setoncolumn(oncolumn + 1)
}


const checkifonbomb = (id : number, columnindex : number) => {
  return bomblocations[columnindex] == id
}


  return (<div>
    <Arrowcontainer 
    oncolumn={oncolumn} 
    ismanual = {ismanual} 
    activefield={map_size} 
    gamestarted ={gamestarted}
    inblockselect = {!canstartgame}></Arrowcontainer>
    <div className='map-gridcontainer'>
     
      {ismanual ? 
      <Gamemap_manual
      mymap={mymap}
      oncolumn={oncolumn}
      setoncolumn={setoncolumn}
      islost={islost}
      setislost={setislost}
      gamestarted = {gamestarted}
      setgamestarted={setgamestarted}
      choosebox={choosebox}
      checkifonbomb={checkifonbomb}
      explodebombon={explodebombon}
      placeballon = {placeballon}
      bomblocations = { bomblocations}
      revealbombon= {revealbombon}
      enablesettings={enablesettings}
      cashout = {cashout}
      betamount = {betamount}
      takeawaymoney = { takeawaymoney}
      volumeon = {volumeon}
      ></Gamemap_manual> 
      : 
      <Gamemap_auto mymap={mymap}
      oncolumn={oncolumn}
      setoncolumn={setoncolumn}
      islost={islost}
      setislost={setislost}
      gamestarted = {gamestarted}
      setgamestarted={setgamestarted}
      enablesettings={enablesettings}
      cashout = {cashout}
      betamount = {betamount}
      takeawaymoney = { takeawaymoney}
      selectrandomlypressed = {selectrandomlypressed}
      setselectrandomlypressed = {setselectrandomlypressed}
      canstartgame = {canstartgame}
      setcanstartgame = {setcanstartgame}
      geteverythingtodefault2 = {geteverythingtodefault2}
      onwinchange = {onwinchange}
      onlosschange = {onlosschange}
      setbetamount = {setbetamount}
      setroundended={setroundended}
      volumeon = {volumeon}
      ></Gamemap_auto>}
    </div></div>
  ); 
};

export default Gamemap;