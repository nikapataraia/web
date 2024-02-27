import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/eventBus';

export default class ResponsiveContainer{
    container : PIXI.Container;
    autospincontainer : PIXI.Container;
    skipbuttoncontainer : PIXI.Container;
    quickplaybuttoncontainer : PIXI.Container;
    gamedescriptioncontainer : PIXI.Container;

    constructor(width : number,height : number,){
        this.container = new PIXI.Container();
        this.container.width = width
        this.container.height = height
        
        this.autospincontainer = new PIXI.Container();
        this.skipbuttoncontainer = new PIXI.Container();
        this.quickplaybuttoncontainer = new PIXI.Container();
        this.gamedescriptioncontainer = new PIXI.Container();

        this.container.addChild(this.autospincontainer);
        this.container.addChild(this.skipbuttoncontainer);
        this.container.addChild(this.quickplaybuttoncontainer);
        this.container.addChild(this.gamedescriptioncontainer);
    }
}