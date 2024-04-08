
import { eventBus } from "@/assets/DataBonus/eventBus";
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
    mapHeight : number;
    mapWidth : number
    fullgameinfo : gameinfo;
    quickplayon : boolean;
    skiped : boolean;

    constructor(mapWidth : number, mapHeight : number, gameWidth : number, gameHeight : number , startersymbols : gameinfo){
        this.skiped = false
        this.gameHeight = gameHeight
        this.gameWidth = gameWidth
        this.mapHeight = mapHeight
        this.mapWidth = mapWidth
        this.reelcontainer = new ReelContainer(mapWidth,mapHeight,this.gameWidth,this.gameHeight , startersymbols)
        this.container = new PIXI.Container();
        this.container.width = gameWidth
        this.container.height = gameHeight
        this.container.addChild(this.reelcontainer.container)
        this.quickplayon = false

        this.infocontainer = new InfoContainer(this.getpoints(),gameWidth,gameHeight,this.quickplayon)
        this.container.addChild(this.infocontainer.container)
        this.fullgameinfo = startersymbols
    }
    changequikcplay(){
        this.reelcontainer.changequikcplay()
        this.quickplayon = !this.quickplayon
        this.infocontainer.changequickplay()
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
                return this.completespecialopparations(specialsymbolactions)
            }
        });
    }

    async completespecialopparations(specialsymbolactions: DoActionInfo){
        eventBus.emit('increaseRoll');
        if (!(Object.keys(specialsymbolactions).length === 0)) {
            for (const reelind of Object.keys(specialsymbolactions)) {
                const reelindex = parseInt(reelind);
                for (const symbolind of Object.keys(specialsymbolactions[reelindex])) {
                    const symbolindex = parseInt(symbolind);
                    const special = this.reelcontainer.reels[reelindex].symbols[symbolindex].symbolcontainer as PointSymbol;
                    await special.doAction(this.fullgameinfo, specialsymbolactions[reelindex][symbolindex], this.reelcontainer, this.reelcontainer.containerwidth / 6, this.gameHeight/5);
                }
            }
        }
        this.infocontainer.increasewinnings(this.calculatetotalpoints());
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

    changedimension(targetScaleX : number, targetScaleY : number) {
        const desiredWidth = this.container.width * targetScaleX;
        const desiredHeight = this.container.height * targetScaleY;
        const scaleX = desiredWidth / this.container.width;
        const scaleY = desiredHeight / this.container.height;
        this.container.scale.x *= scaleX;
        this.container.scale.y *= scaleY;
    }

    changeskiped(){
        this.skiped = true
        this.reelcontainer.changeskiped()
        this.infocontainer.changeskiped()
    }

    changeskiped_tofalse(){
        this.skiped = false
        this.reelcontainer.changeskiped_tofalse()
        this.infocontainer.changeskiped_tofalse()
    }

    loadinstarters(startersymbols : gameinfo){
        this.reelcontainer.loadinstarters(startersymbols)
    }
    reset(){
        this.infocontainer.reset()
        this.reelcontainer.reset()
    }
}