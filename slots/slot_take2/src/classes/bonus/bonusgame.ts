import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/eventBus';
import type GameSimulation from './gamedimulation/game';
export default class BonusGame{
    bonusgamecontainer : BonusGameContainer
    bonusgamecontroller : BonusController
    bonusgame_app : PIXI.Application<PIXI.ICanvas>
    appWidth : number;
    appHeight : number;
    gamesimulation : GameSimulation

    constructor(appwidth : number,appheight : number , mapwidth : number, mapheight : number , gamesimulation : GameSimulation){
        this.gamesimulation = gamesimulation
        this.appHeight = appheight
        this.appWidth = appwidth
        this.bonusgame_app = new PIXI.Application({
            width : this.appWidth,
            height : this.appHeight,
            backgroundColor : 'black'
        })
        this.bonusgamecontainer = new BonusGameContainer(mapwidth,mapheight,appwidth,appheight * 0.9, gamesimulation.startinginfo)
        this.bonusgame_app.stage.addChild(this.bonusgamecontainer.container)

        this.bonusgamecontroller = new BonusController(1,appwidth,appheight)
        this.bonusgame_app.stage.addChild(this.bonusgamecontroller.container)
    }

    async play() {
        const [simulationResult, totalPoints, sniperHits] = this.gamesimulation.simulate();

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        for (let i = 0; i < simulationResult.length; i++) {
            await this.bonusgamecontainer.animatereels(simulationResult[i]);
            await delay(500);
        }
    }

    changedimension(newWidth: number, newHeight: number) {
        this.bonusgame_app.renderer.resize(newWidth, newHeight);
        const scaleX = newWidth / this.appWidth;
        const scaleY = newHeight / this.appHeight;
        this.bonusgamecontainer.container.scale.x = scaleX;
        this.bonusgamecontainer.container.scale.y = scaleY;
        this.appWidth = newWidth;
        this.appHeight = newHeight;
    }
}