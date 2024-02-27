
import InfoContainer from "./infocontainer";
import { ReelContainer } from "./reelcontainer";
import * as PIXI from 'pixi.js'
export class BonusGameContainer{
    reelcontainer : ReelContainer
    infocontainer : InfoContainer;
    container : PIXI.Container;
    gameWidth : number;
    gameHeight : number;

    constructor(mapWidth : number, mapHeight : number, gameWidth : number, gameHeight : number){
        this.gameHeight = gameHeight
        this.gameWidth = gameWidth
        this.reelcontainer = new ReelContainer(mapWidth,mapHeight,this.gameWidth,this.gameHeight)
        this.container = new PIXI.Container();
        this.container.width = gameWidth
        this.container.height = gameHeight
        this.container.addChild(this.reelcontainer.container)

        this.infocontainer = new InfoContainer(2,gameWidth,gameHeight)
        this.container.addChild(this.infocontainer.container)
    }

}