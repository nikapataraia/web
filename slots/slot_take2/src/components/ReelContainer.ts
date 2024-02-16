import { generateType, slotTextures } from '@/assets/Data';
import * as PIXI from 'pixi.js'

export const ReelContainer : PIXI.Container = new PIXI.Container();
export const ReelInfoContainer = []

export function GenerateReelContainer(mapWidth: number | undefined, mapHeight: number | undefined, app : PIXI.Application<PIXI.ICanvas> , maxmapWidth : number,appWidth : number, appHeight : number) :  void{
    if (mapWidth === undefined || mapHeight === undefined) {
        console.error('mapWidth or mapHeight is undefined');
        return;
      }
    const Reelcontainerwidth = appWidth * (6/10)
    ReelContainer.width = Reelcontainerwidth
    ReelContainer.height = appHeight
    ReelContainer.x = 5 + (appWidth - Reelcontainerwidth) /2 
    ReelContainer.y = 5
    app.stage.addChild(ReelContainer)

    let reelwidth = (Reelcontainerwidth - 10) / mapWidth
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
    let symbolcontainerheight = reelheight / mapheight
    ReelContainer.addChildAt(reel,onindex)
    for(let i = 0; i < mapheight; i++){
        let symbolcontainer = new PIXI.Container()
        symbolcontainer.width = reelwidth - 10
        symbolcontainer.height = symbolcontainerheight
        symbolcontainer.x = 5;
        symbolcontainer.y =  i * (symbolcontainerheight);
        reel.addChild(symbolcontainer) 
        const symbol = new PIXI.Sprite(slotTextures[generateType()]);
        symbol.width = reelwidth - 10
        symbol.height = symbolcontainerheight - 10
        symbolcontainer.addChild(symbol) 
    }
    
}


export function addReeltoright(app : PIXI.Application<PIXI.ICanvas>){
    let appWidth = app.stage.width
    let appHeight = app.stage.height

    const Reelcontainerwidth = appWidth * (6/10)
    let reelwidth = (Reelcontainerwidth - 10) / 4
    let reelHeight = appHeight - 10

    ReelContainer.width = ReelContainer.width + appWidth/5
    GenerateReel(reelwidth,reelHeight,5,4)
    console.log(ReelContainer)
}