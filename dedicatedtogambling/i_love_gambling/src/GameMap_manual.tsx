import Arrowcontainer from "./Arrow_container";
import map from "./models/map";

interface gamemapmanualprops {
    mymap :map;
    oncolumn : number;
    setoncolumn : React.Dispatch<React.SetStateAction<number>>;
    islost : boolean;
    setislost : React.Dispatch<React.SetStateAction<boolean>>;
    gamestarted : boolean;
    setgamestarted : React.Dispatch<React.SetStateAction<boolean>>;
    choosebox : Function;
    checkifonbomb : Function;
    explodebombon : Function;
    placeballon : Function;
    bomblocations : number[];
    revealbombon : Function;
    enablesettings:Function;
    cashout:Function;
    betamount:number;
    takeawaymoney : Function;
    volumeon : boolean;
}

const Gamemap_manual: React.FC<gamemapmanualprops> = 
({mymap,
    oncolumn,
    setoncolumn,
    islost,
    setislost,
    gamestarted,
    setgamestarted,
    choosebox,
    checkifonbomb,
    explodebombon,
    placeballon,
    bomblocations,
    revealbombon,
    enablesettings,
    cashout,
    betamount,
    takeawaymoney,
    volumeon,
}) => {
    const handleblockclicks_manual = (index : number, columnindex : number) => {
        choosebox(index)
        const landedonbomb = checkifonbomb(index, columnindex)
        if(landedonbomb){
          explodebombon(index, columnindex)
          loseonmanual(columnindex)
          return
        }
        placeballon(index , columnindex)
        revealbombon(bomblocations[columnindex] , columnindex)
        if(columnindex == mymap.columns - 1){
          enablesettings()
          setgamestarted(false)
          cashout(mymap.values[mymap.values.length - 1], betamount)
        } 
        return
      }
    
      const loseonmanual = (columnindex : number) => {
        for(let i = columnindex + 1 ; i < mymap.columns ; i ++){
          revealbombon(bomblocations[i] , i)
        }
        setislost(true)
        enablesettings()
        setgamestarted(false)
        takeawaymoney(mymap.values[columnindex], betamount)
      }
    






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
                key={j + 1}
                className={`${classname_columnblocks} ${isActive && ((gamestarted && true) || !true) ? 'active-mapcolumnblocks' : ''}  ${islost ? 'lost-mapcolumnblocks' : ''}`}
                onClick={isActive ? (() => handleblockclicks_manual(j, i))  : undefined}
              ></div>
            );
          }
      
          column.push(<div className={classname_columnvalue}>{`x${mymap.values[i]}`}</div>);
          grid.push(<div className={classnameColumn} key={i} style={{ width: columnWidth }}>{column}</div>);
        }
        return grid;
      };

      return (
        <>{generategrid_auto()}</>
      )


}

export default Gamemap_manual