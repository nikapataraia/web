import * as PIXI from 'pixi.js'
import { Reel } from './reel';
import type { gameinfo } from './gamedimulation/game';
import PointSymbol from './symbols/pointssymbol';
export class ReelContainer {
    container: PIXI.Container;
    reels: Reel[];
    animationcomplete : boolean;
    containerwidth : number
    cotaninerheight : number

    constructor(mapWidth: number, mapHeight: number, appWidth: number, appHeight: number, startersymbols : gameinfo) {
        this.animationcomplete = false
        this.container = new PIXI.Container();
        const containerWidth = appWidth * 0.6
        this.container.width = containerWidth;
        this.container.height = appHeight;
        this.container.x = appWidth * 0.2
        this.containerwidth = containerWidth
        this.cotaninerheight = appHeight
        

        const background = new PIXI.Graphics();
        background.beginFill(0x0000FF);
        background.drawRect(0, 0, containerWidth, appHeight);
        background.endFill();

        this.container.addChild(background);

        const reelWidth = containerWidth / mapWidth;
        const reelHeight = appHeight;
        this.reels = [];
        
        for (let i = 0; i < mapWidth; i++) {
            const newReel = new Reel( reelWidth, reelHeight, mapHeight, i  * reelWidth , startersymbols[i] ,i);
            this.reels.push(newReel);
            this.container.addChild(newReel.container);
        }
    }

    animatereels(newreels : gameinfo) {
        this.animationcomplete = false
        const reelPromises = this.reels.map((reel, index) => 
            new Promise<void>(resolve => setTimeout(() => {
                resolve(reel.animatereel(false , ((newreels && newreels[index]) ? newreels[index] : {})));
            }, 50 * index))
        );
    
        return Promise.all(reelPromises)
    }

    getpoints(){
        let points = 0
        this.reels.forEach(element => {
            element.symbols.forEach((symbolcontainer) => {
                const symbol = symbolcontainer.symbolcontainer
                if(symbol instanceof PointSymbol){
                    points += symbol.value
                }
            })
        });
        return points
    }
}