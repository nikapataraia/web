import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/eventBus';
import type GameSimulation from './gamedimulation/game';

export interface reelinfo{
    [key : number] : [number, number]
}

export interface gameinfo{
    [key : number] : reelinfo
}

export interface coordinates {
    reelIndex: number;
    symbolIndex: number;
}

export default class BonusGame{
    bonusgamecontainer : BonusGameContainer
    bonusgamecontroller : BonusController
    bonusgame_app : PIXI.Application<PIXI.ICanvas>
    appWidth : number;
    appHeight : number;
    gamesimulation : GameSimulation
    currentgameinfo : gameinfo;
    quickplayon : boolean

    constructor(appwidth : number,appheight : number , mapwidth : number, mapheight : number , gamesimulation : GameSimulation){
        this.gamesimulation = gamesimulation
        this.appHeight = appheight
        this.appWidth = appwidth
        this.quickplayon = false
        this.bonusgame_app = new PIXI.Application({
            width : this.appWidth,
            height : this.appHeight,
            backgroundColor : 'black'
        })
        this.bonusgamecontainer = new BonusGameContainer(mapwidth,mapheight,appwidth,appheight * 0.9, gamesimulation.startinginfo)
        this.bonusgame_app.stage.addChild(this.bonusgamecontainer.container)

        this.bonusgamecontroller = new BonusController(1,appwidth,appheight)
        this.bonusgame_app.stage.addChild(this.bonusgamecontroller.container)
        this.currentgameinfo = gamesimulation.startinginfo;
    }

    async play() {
        const [simulationResult, totalPoints] = this.gamesimulation.simulate2();
        console.log('game started')
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        for (let i = 0; i < simulationResult.length; i++) {
            await this.bonusgamecontainer.animatereels(simulationResult[i].gameinfo , simulationResult[i].actioninfo);
            await this.quickplayon ? delay(500) : delay(1000);
        }
    }

    changedimension(newWidth: number, newHeight: number) {
        this.bonusgame_app.renderer.resize(newWidth, newHeight);
        const scaleX = newWidth / this.appWidth;
        const scaleY = newHeight / this.appHeight;
        this.appWidth = newWidth;
        this.appHeight = newHeight;
        this.bonusgamecontainer.changedimension(scaleX,scaleY)
    }

    changequikcplay(){
        this.quickplayon = !this.quickplayon
        this.bonusgamecontroller.quickplayon = !this.bonusgamecontroller.quickplayon
        this.bonusgamecontainer.reelcontainer.changequikcplay()
    }
}