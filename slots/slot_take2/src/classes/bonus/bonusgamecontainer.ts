
import { eventBus } from "@/assets/eventBus";
import InfoContainer from "./infocontainer";
import { ReelContainer } from "./reelcontainer";
import * as PIXI from 'pixi.js'
import type { gameinfo } from "./bonusgame";


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

    animatereels(newreels: gameinfo) {
        eventBus.emit('decreaseRoll');
        let isEmpty = true;
        Object.keys(newreels).forEach(key => {
            if (Object.keys(newreels[parseInt(key)]).length > 0) {
                isEmpty = false; 
            }
        });
        return this.reelcontainer.animatereels(newreels).then(() => {
            if(!isEmpty){
                eventBus.emit('increaseRoll');
            }
        });
    }

    getpoints(){
        return this.reelcontainer.getpoints()
    }

}