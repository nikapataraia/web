
import { ReelContainer } from "./reelcontainer";
import * as PIXI from 'pixi.js'
import { WingContainer } from "./wingcontainer";
export class BonusGameContainer{
    reelcontainer : ReelContainer
    container : PIXI.Container;
    gameWidth : number;
    gameHeight : number;
    // wingcontainer : WingContainer;

    constructor(mapWidth : number, mapHeight : number, gameWidth : number, gameHeight : number){
        this.gameHeight = gameHeight
        this.gameWidth = gameWidth
        this.reelcontainer = new ReelContainer(mapWidth,mapHeight,this.gameWidth,this.gameHeight)
        this.container = new PIXI.Container();
        this.container.width = gameWidth
        this.container.height = gameHeight
        this.container.addChild(this.reelcontainer.container)
        // this.wingcontainer = new WingContainer(this.gameWidth,this.gameHeight)
        // this.container.addChild(this.wingcontainer.wingcontainer)
    }

}