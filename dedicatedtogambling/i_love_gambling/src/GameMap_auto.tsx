import { useEffect, useState,useRef } from "react";
import map from "./models/map";
import images from "./assets/images";
import data from "./data/data";
import audios from "./assets/Audiomanager";


interface gamemapautoprops {
    mymap :map;
    oncolumn : number;
    setoncolumn : React.Dispatch<React.SetStateAction<number>>;
    islost : boolean;
    setislost : React.Dispatch<React.SetStateAction<boolean>>;
    gamestarted : boolean;
    setgamestarted : React.Dispatch<React.SetStateAction<boolean>>;
    enablesettings:Function;
    cashout:Function;
    betamount:number;
    takeawaymoney : Function;
    selectrandomlypressed : boolean;
    setselectrandomlypressed : React.Dispatch<React.SetStateAction<boolean>>;
    canstartgame:boolean;
    setcanstartgame : React.Dispatch<React.SetStateAction<boolean>>;
    geteverythingtodefault2 : Function;
    onwinchange :number
    onlosschange : number
    setbetamount:React.Dispatch<React.SetStateAction<number>>;
    setroundended:React.Dispatch<React.SetStateAction<boolean>>;
    volumeon : boolean;
}


const Gamemap_auto: React.FC<gamemapautoprops> = ({
    mymap,
    oncolumn,
    setoncolumn,
    islost,
    setislost,
    gamestarted,
    setgamestarted,
    enablesettings,
    cashout,
    betamount,
    takeawaymoney,
    selectrandomlypressed,
    setselectrandomlypressed,
    canstartgame,
    setcanstartgame,
    geteverythingtodefault2,
    onwinchange,
    onlosschange,
    setbetamount,
    setroundended:
    setroundstarted,
    volumeon,
  }) => {

    const [chosenboxes , setchosenboxes] = useState<number[]>([])
    const [blockchoosephase,setblockchoosephase] = useState<boolean>(true)
    const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

    const choosebox = (index : number) => {
      setchosenboxes((prevIds) => [...prevIds, index])
      setoncolumn(oncolumn + 1)
      if(oncolumn >= mymap.columns - 1){
         setblockchoosephase(false)
      }
    }

    useEffect(() => {
      setblockchoosephase(true)
      setchosenboxes([])

    },[mymap])

    const generatebombs = () => {
      const bomblocations = []
    for(let i = 0; i < mymap.columns; i++){
    bomblocations.push(Math.floor(Math.random() * mymap.rows))
    }
    return bomblocations;
    }

    const makebetsound = () => {
      const clickAudio = new Audio(audios.Bet_audio);
      if(volumeon){
      clickAudio.play();}
    }
    
    useEffect(() => {
      if (selectrandomlypressed) {
        handlerandomizerclick()
        setselectrandomlypressed(false);
      }
    }, [selectrandomlypressed]);


    const generategrid_auto = () => {
        const grid = [];
        const classnameColumn = 'map-column';
        const classname_columnblocks = 'map-columnblocks';
        const classname_columnvalue = 'map-columnvalue';
      
        const columnWidth = `calc(${100 / mymap.columns}% - ${6 * (mymap.columns - 1)}px)`;
        for (let i = 0; i < mymap.columns; i++) {
          const column = [];
          for (let j = 0; j < mymap.rows; j++) {
            const isActive = oncolumn === i;
            column.push(
              <div
                key={j}
                className={`
                ${classname_columnblocks} ${isActive && blockchoosephase ? 'active-mapcolumnblocks' : ''}  
                ${islost ? 'lost-mapcolumnblocks' : ''}  
                ${(i < oncolumn || canstartgame) ? 'map-picked-columns' : ''}
                ${canstartgame ? 'cancel-map-blocks' : ''}`}
                onClick={isActive ? () => handleblockclicks_auto(j, i) : undefined}
              ></div>
            );
          }
      
          column.push(<div className={classname_columnvalue}>{`x${mymap.values[i]}`}</div>);
          grid.push(<div className={classnameColumn} key={i} style={{ width: columnWidth }}>{column}</div>);
        }
        return grid;
      };


    const checkifonbomb = (bomblocation : number , index : number) => {
      return index == bomblocation
    }

    const handlerandomizerclick = () => {
      handleblockclicks_auto(Math.floor(Math.random() * mymap.rows) , oncolumn)
    }
  
    const handleblockclicks_auto = (index: number, columnindex: number) => {
      choosebox(index)
      placeflagon(index,columnindex)
      if(columnindex == mymap.columns - 1){
        setcanstartgame(true)
      }
    };
    const revealitem = (index: number, columnindex: number, image : string) => {
      const gridContainer = document.querySelector('.map-gridcontainer');
      if (gridContainer) {
        const columnElements = gridContainer.children;
        if (columnElements[columnindex]) {
          const blockElement = columnElements[columnindex].children[index] as HTMLDivElement;
          const bombElement = document.createElement('img');
          bombElement.src = image;
          bombElement.alt = 'Reveal Bomb';
          bombElement.className = 'map-blockimages';
          blockElement.appendChild(bombElement);
        }
      }
    };

    const revealbombon = (index: number, columnindex: number) => {
      revealitem(index,columnindex,images.Bomb_icon)
    }

    const placeflagon = (index: number, columnindex: number) => {
      revealitem(index,columnindex,images.Flag_icon)
    }

    const placeexplotionon = (index: number, columnindex: number) => {
      revealitem(index,columnindex,images.Explosion_icon)
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

    const resetmap = (bomblocations : number[] , flaglocations : number[]) => {
      setoncolumn(0)
      setislost(false)
      for(let i = 0; i < mymap.columns ; i++){
        clearblock(bomblocations[i] , i)
        clearblock(flaglocations[i] , i)
        placeflagon(flaglocations[i] , i)
      }
    }

    const changebetamount_auto = (won : boolean , currentbetamount : number) => {
      let newBetAmount = 0
      if(won){
        newBetAmount = currentbetamount + currentbetamount * (onwinchange/100)
        newBetAmount = (newBetAmount > data.max_bet ? data.max_bet : (newBetAmount < data.min_bet ? data.min_bet : newBetAmount))
      }
      else{
        newBetAmount = currentbetamount + currentbetamount * (onlosschange/100)
        newBetAmount = (newBetAmount > data.max_bet ? data.max_bet : (newBetAmount < data.min_bet ? data.min_bet : newBetAmount))
      }

        return newBetAmount
    }


    const updatebetinputvalue = (currentbetamount : number) => {
      const betinput = document.getElementById('bet-input') as HTMLInputElement
        if(betinput){
          betinput.value = currentbetamount.toFixed(2).toString()
        }
    }
    useEffect(() => {
      let loopActive = true;
      let currentbetamount = betamount
      const runGameLoop = async () => {
        setroundstarted(true);
        try {
          while (gamestarted && loopActive) {
            updatebetinputvalue(currentbetamount)
            setislost(false)
            makebetsound()
            const currentBombLocations = generatebombs()
            for (let i = 0; i < mymap.columns; i++) {
                await delay(600);
              if (checkifonbomb(currentBombLocations[i], chosenboxes[i])) {
                loseround(i,currentBombLocations,currentbetamount);
                currentbetamount = changebetamount_auto(false,currentbetamount)
                break;
              }
              revealbombon(currentBombLocations[i],i)
              if (i == mymap.columns - 1) {
                wonaround(currentbetamount);
                currentbetamount = changebetamount_auto(true,currentbetamount)
              }
            }
            await delay(400);
            resetmap(currentBombLocations,chosenboxes)
            await delay(1000)
            setbetamount(currentbetamount)
          }
          setroundstarted(false);
        } catch (error) {
          console.error('Error in game loop:', error);
        }
        geteverythingtodefault2();
      };
      if (gamestarted) {
        runGameLoop();
      } else {
        loopActive = false;
      }
      return () => {
        loopActive = false;
      };
    }, [gamestarted]);

    const loseround = (loseoncolumn : number, bomblocations : number[],currentbetamount : number) => {
      for(let j = loseoncolumn ; j  < mymap.columns; j ++){
        if(checkifonbomb(bomblocations[j], chosenboxes[j])){
          clearblock(chosenboxes[j] , j)
          placeexplotionon(chosenboxes[j] , j)
        }
        else{
          revealbombon( bomblocations[j], j)
        }
       
      }
      takeawaymoney(mymap.values[loseoncolumn], currentbetamount)
      setislost(true)
    }

    const wonaround = (currentbetamount:number) => {
      cashout(mymap.values[mymap.columns - 1] ,currentbetamount)
    }



  
    return ( <>{generategrid_auto()}</> );
  };
  
  export default Gamemap_auto;