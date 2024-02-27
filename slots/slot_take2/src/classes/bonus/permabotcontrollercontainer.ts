import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/eventBus';

export default class PermaBotContainer{
    container : PIXI.Container;
    betcontainer: PIXI.Container;
    wincontainer : PIXI.Container;
    balancecontainer : PIXI.Container;  
    constructor(width : number,height : number,){
        this.container = new PIXI.Container()
        this.container.width = width
        this.container.height = height
    }
}