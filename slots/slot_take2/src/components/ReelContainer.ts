import { generateType, slotTextures } from '@/assets/Data';
import * as PIXI from 'pixi.js'

export const ReelContainer : PIXI.Container = new PIXI.Container();
export const ReelInfoContainer = []

export function 
GenerateReelContainer(mapWidth: number | undefined, mapHeight: number | undefined, app : PIXI.Application<PIXI.ICanvas> , appWidth : number, appHeight : number) :  void{
    if (mapWidth === undefined || mapHeight === undefined) {
        console.error('mapWidth or mapHeight is undefined');
        return;
      }
    
    const Reelcontainerwidth = appWidth * 0.1 * (mapWidth)
    ReelContainer.width = Reelcontainerwidth
    ReelContainer.height = appHeight - 10
    ReelContainer.x =  appWidth * 0.15 + (mapWidth == 7 ? 0 : appWidth * 0.1)
    ReelContainer.y = 10
    app.stage.addChild(ReelContainer)

    let reelwidth = (Reelcontainerwidth) / mapWidth
    let reelHeight = appHeight - 10
        for(let i = 0; i < mapWidth; i++){
            GenerateReel(reelwidth,reelHeight,mapHeight,i)
        }
        
}


function GenerateReel(reelwidth : number,reelheight : number,mapheight : number,  onindex : number) {
    let reel = new PIXI.Container()
    reel.width = reelwidth
    reel.height = reelheight
    reel.x = onindex * reelwidth
    let symbolcontainerheight = reelheight / mapheight;
    let SymbolContainerWidth = reelwidth;
    ReelContainer.addChildAt(reel,onindex)
    for(let i = 0; i < mapheight; i++){
        let symbolcontainer = new PIXI.Container()
        symbolcontainer.width = SymbolContainerWidth
        symbolcontainer.height = symbolcontainerheight
        symbolcontainer.y =  i * (symbolcontainerheight);
        reel.addChild(symbolcontainer) 
        const symbol = new PIXI.Sprite(slotTextures[generateType()]);
        symbol.width = reelwidth - 10
        symbol.height = symbolcontainerheight - 10
        symbol.x = 5
        symbolcontainer.addChild(symbol) 
    }
    
}


export function animateSymbolDrops(){
    
}