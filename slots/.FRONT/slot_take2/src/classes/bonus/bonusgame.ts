import * as PIXI from 'pixi.js'
import { BonusController } from './bonuscontrolls'
import { BonusGameContainer } from './bonusgamecontainer'
import { eventBus } from '../../assets/DataBonus/eventBus';
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
    bonusgame_app : PIXI.Application<PIXI.ICanvas>
    appWidth : number;
    appHeight : number;
    gamesimulation : GameSimulation | null
    currentgameinfo : gameinfo;
    speedlevel : number
    skiped : boolean;
    getBackFromBonus : Function

    constructor(appwidth : number,appheight : number , mapwidth : number, mapheight : number , getBackFromBonus : Function){
        this.gamesimulation = null
        this.currentgameinfo = {}
        this.appHeight = appheight
        this.appWidth = appwidth
        this.speedlevel = 1
        this.skiped = false
        this.getBackFromBonus = getBackFromBonus
        this.bonusgame_app = new PIXI.Application({
            width : this.appWidth,
            height : this.appHeight,
            backgroundColor : 'black'
        })
        this.bonusgamecontainer = new BonusGameContainer(mapwidth,mapheight,appwidth,appheight, {})
        this.bonusgame_app.stage.addChild(this.bonusgamecontainer.container)
    }

    async play() {
        if(this.gamesimulation){
        const [simulationResult, totalPoints] = this.gamesimulation.simulate2();
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        this.changeskiped_tofalse()
        delay(1000)
        for (let i = 0; i < simulationResult.length; i++) {
            await this.bonusgamecontainer.animatereels(simulationResult[i].gameinfo , simulationResult[i].actioninfo);
            await (this.speedlevel ? delay(300) : delay(600));
            this.changeskiped_tofalse()
        }
        this.getBackFromBonus(this.bonusgamecontainer.calculatetotalpoints())
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

    changespeedlevel(speedlevel : number){
        this.speedlevel = speedlevel
        this.bonusgamecontainer.changespeedlevel(speedlevel)
    }

    changeskiped_totrue(){
        this.skiped = true
        this.bonusgamecontainer.changeskiped()
    }

    changeskiped_tofalse(){
        this.skiped = false
        this.bonusgamecontainer.changeskiped_tofalse()
    }

    loadingame(game : GameSimulation){
        this.gamesimulation = game
        const startinginfo = this.gamesimulation.startinginfo;
        this.bonusgamecontainer.loadinstarters(startinginfo)
        this.bonusgamecontainer.infocontainer.winninginfo.changeWinnings(this.bonusgamecontainer.calculatetotalpoints())
    }
    reset(){
        this.bonusgamecontainer.reset()
        this.gamesimulation = null
        this.currentgameinfo = {}
        this.changespeedlevel(this.speedlevel)
        }
}