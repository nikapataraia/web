import * as PIXI from 'pixi.js'
import { Reel } from './reel';
import type { gameinfo } from './gamedimulation/game';
import PointSymbol from './symbols/pointssymbol';
export class ReelContainer {
    container: PIXI.Container;
    reels: Reel[];
    containerwidth : number
    cotaninerheight : number
    speedlevel : number
    skiped : boolean;

    constructor(mapWidth: number, mapHeight: number, appWidth: number, appHeight: number, startersymbols : gameinfo) {
        this.skiped = false
        this.speedlevel = 1
        this.container = new PIXI.Container();
        const containerWidth = appWidth * 0.7
        this.container.width = containerWidth;
        this.container.height = appHeight;
        this.container.x = appWidth * 0.15
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
        const reelPromises = this.reels.map((reel, index) => 
            new Promise<void>(resolve => setTimeout(() => {
                resolve(reel.animatereel( this.speedlevel, ((newreels && newreels[index]) ? newreels[index] : {})));
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
    changespeedlevel(speedlevel : number){
        this.speedlevel = speedlevel
        this.reels.forEach((reel) => {
            reel.changespeedlevel(speedlevel)
        })
    }

    changeskiped(){
        this.skiped = true
        this.reels.forEach((reel) => {
            reel.changeskiped()
        })
    }

    changeskiped_tofalse(){
        this.skiped = false
        this.reels.forEach((reel) => {
            reel.changeskiped_tofalse()
        })
    }

    loadinstarters(startersymbols : gameinfo){
        this.reels.map((reel , index) => {
            if(startersymbols && startersymbols[index]){
                reel.loadinstarters(startersymbols[index])
            }
        })
    }
    reset(){
        this.reels.forEach((reel) => {
            reel.reset()
        })
    }
}