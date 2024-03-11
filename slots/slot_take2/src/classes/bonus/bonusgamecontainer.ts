
import { eventBus } from "@/assets/eventBus";
import InfoContainer from "./infocontainer";
import { ReelContainer } from "./reelcontainer";
import * as PIXI from 'pixi.js'
import type { gameinfo } from "./bonusgame";
import type { DoActionInfo } from "./gamedimulation/game";
import PointSymbol from "./symbols/pointssymbol";


export class BonusGameContainer{
    reelcontainer : ReelContainer
    infocontainer : InfoContainer;
    container : PIXI.Container;
    gameWidth : number;
    gameHeight : number;
    fullgameinfo : gameinfo;

    constructor(mapWidth : number, mapHeight : number, gameWidth : number, gameHeight : number , startersymbols : gameinfo){
        this.gameHeight = gameHeight
        this.gameWidth = gameWidth
        this.reelcontainer = new ReelContainer(mapWidth,mapHeight,this.gameWidth,this.gameHeight , startersymbols)
        this.container = new PIXI.Container();
        this.container.width = gameWidth
        this.container.height = gameHeight
        this.container.addChild(this.reelcontainer.container)

        this.infocontainer = new InfoContainer(this.getpoints(),gameWidth,gameHeight)
        this.container.addChild(this.infocontainer.container)
        this.fullgameinfo = startersymbols
    }

    animatereels(newreels: gameinfo, specialsymbolactions: DoActionInfo): Promise<void> {
        eventBus.emit('decreaseRoll');
        let isEmpty = true;
        Object.keys(newreels).forEach(key => {
            if (Object.keys(newreels[parseInt(key)]).length > 0) {
                isEmpty = false;
            }
        });
    
        return this.reelcontainer.animatereels(newreels).then(async () => {
            if (!isEmpty) {
                eventBus.emit('increaseRoll');
                if (!(Object.keys(specialsymbolactions).length === 0)) {
                    for (const reelind of Object.keys(specialsymbolactions)) {
                        const reelindex = parseInt(reelind);
                        for (const symbolind of Object.keys(specialsymbolactions[reelindex])) {
                            const symbolindex = parseInt(symbolind);
                            const special = this.reelcontainer.reels[reelindex].symbols[symbolindex].symbolcontainer as PointSymbol;
                            await special.doAction(this.fullgameinfo, specialsymbolactions[reelindex][symbolindex], this.reelcontainer.reels, false, this.gameWidth,this.gameHeight);
                        }
                    }
                }
                this.infocontainer.increasewinnings(this.calculatetotalpoints());
            }
        });
    }

    calculatetotalpoints(){
        let total = 0
        this.reelcontainer.reels.forEach(reel => {
            reel.symbols.forEach(symbol => {
                if(symbol.symbolcontainer instanceof PointSymbol){
                    total += symbol.symbolcontainer.value;
                }
            })
        });
        return total
    }
    getpoints(){
        return this.reelcontainer.getpoints()
    }

}