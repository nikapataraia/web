import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/eventBus';
import BalanceDisplay from './controllerchildren/balance';
import WinningContainer from './controllerchildren/winnings';
import BetDisplay from './controllerchildren/bet';

export default class PermaBotContainer{
    container : PIXI.Container;
    betcontainer: BetDisplay;
    wincontainer : WinningContainer;
    balancecontainer : BalanceDisplay;  
    constructor(width : number,height : number,){
        this.container = new PIXI.Container()
        this.container.width = width
        this.container.height = height

        this.betcontainer = new BetDisplay(1,width,height)
        this.wincontainer = new WinningContainer(0,width,height)
        this.balancecontainer = new BalanceDisplay(5000,width,height)

        this.container.addChild(this.betcontainer.container);
        this.container.addChild(this.wincontainer.container);
        this.container.addChild(this.balancecontainer.container);

        this.betcontainer.container.x = 0.25 * width
        this.wincontainer.container.x = width * 0.60
        this.balancecontainer.container.x = width * 0.8
    }
}