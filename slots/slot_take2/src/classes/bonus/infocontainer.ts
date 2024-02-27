import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/eventBus';
import RollInfo from './rollinfo';
import WinningInfo from './winninginfo';

export default class InfoContainer{
    rollinfo : RollInfo;
    winninginfo : WinningInfo;
    container : PIXI.Container;
    constructor(startingwinning : number , appwidth : number, appheight : number){
        this.container = new PIXI.Container
        this.rollinfo = new RollInfo(appwidth,appheight)
        this.winninginfo = new WinningInfo(appwidth,appheight,startingwinning)

        this.container.width = appwidth
        this.container.height = appheight
        this.container.addChild(this.winninginfo.container)
        this.container.addChild(this.rollinfo.container)
    }
}