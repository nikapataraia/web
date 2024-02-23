import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../assets/eventBus';
export default class BonusGame{
    bonusgamecontainer : BonusGameContainer
    bonusgamecontroller : BonusController
    bonusgame_app : PIXI.Application<PIXI.ICanvas>
    appWidth : number;
    appHeight : number;

    constructor(appwidth : number,appheight : number , mapwidth : number, mapheight : number){
        this.appHeight = appheight
        this.appWidth = appwidth
        this.bonusgamecontroller = new BonusController()
        this.bonusgamecontainer = new BonusGameContainer(mapwidth,mapheight,appwidth,appheight * 0.9)

        this.bonusgame_app = new PIXI.Application({
            width : this.appWidth,
            height : this.appHeight,
            backgroundColor : 'black'
        })

        this.bonusgame_app.stage.addChild(this.bonusgamecontainer.container)
    }

    openwing() {
        eventBus.emit('openwing');
    }

    wigglewing() {
        eventBus.emit('wigglewing');
    }
    animatereels(){
        eventBus.emit('animatereels')
    }
}