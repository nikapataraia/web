import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/DataBonus/eventBus';
import RollInfo from './rollinfo';
import WinningInfo from './winninginfo';

export default class InfoContainer{
    rollinfo : RollInfo;
    winninginfo : WinningInfo;
    container : PIXI.Container;
    constructor(startingwinning : number , appwidth : number, appheight : number,quickplayon : boolean){
        this.container = new PIXI.Container
        this.rollinfo = new RollInfo(appwidth,appheight,quickplayon)
        this.winninginfo = new WinningInfo(appwidth,appheight,startingwinning,quickplayon)

        this.container.width = appwidth
        this.container.height = appheight
        this.container.addChild(this.winninginfo.container)
        this.container.addChild(this.rollinfo.container)
    }

    decreaseroll(){
        this.rollinfo.decreaseroll();
    }
    increasewinnings(total : number){
        this.winninginfo.changeWinnings(total)
    }
    changequickplay(){
        this.rollinfo.changequickplay()
        this.winninginfo.changequickplay()
    }
    changeskiped(){
        this.rollinfo.changeskiped()
        this.winninginfo.changeskiped()
    }
    changeskiped_tofalse(){
        this.rollinfo.changeskiped_tofalse()
        this.winninginfo.changeskiped_tofalse()
    }
}