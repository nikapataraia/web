import * as PIXI from 'pixi.js'
import { Wing } from './wing'
import * as Tween from '@tweenjs/tween.js';
import { eventBus } from '@/assets/eventBus';
export class WingContainer{
    leftwing : Wing;
    rightwing : Wing;
    wingcontainer : PIXI.Container;
    appWidth : number

    constructor(appWidth: number, appHeight: number) {
        this.appWidth = appWidth
        this.wingcontainer = new PIXI.Container();
        this.wingcontainer.width = appWidth;
        this.wingcontainer.height = appHeight;

        this.leftwing = new Wing(appWidth, appHeight);
        this.rightwing = new Wing(appWidth, appHeight);
        this.leftwing.wing.width = appWidth * 0.12;
        this.leftwing.wing.x = appWidth * 0.13;
        this.rightwing.wing.width = appWidth * 0.12;
        this.rightwing.wing.x = appWidth * 0.75;
        this.wingcontainer.addChild(this.leftwing.wing)
        this.wingcontainer.addChild(this.rightwing.wing)

        eventBus.on('openwing', () => {
            this.openwing();
        });

        eventBus.on('wigglewing', () => {
            this.wigglewing();
        });
    }

    private openleftwing(appWidth : number , duration : number){
        return this.leftwing.openWing(0.03 * appWidth, duration)
    }

    private openrightwing(appWidth : number, duration : number){
        return this.rightwing.openWing(appWidth * 0.85, duration)
    }

    private wiggleleftwing(wigglesLeft: boolean, distance: number, duration: number){
        return this.leftwing.wigglewing(wigglesLeft, distance, duration)
    }

    private wigglerightwing(wigglesLeft: boolean, distance: number, duration: number){
        return this.rightwing.wigglewing(wigglesLeft, distance, duration)
    }


    private openwing(){
        if(this.leftwing.isopen && this.rightwing.isopen){
            return
        }
        if(this.rightwing.isopen){
            this.openleftwing(this.appWidth , 1000)
            return
        }
        this.openrightwing(this.appWidth , 1000)
    }

    private wigglewing(){
        if(this.leftwing.isopen && this.rightwing.isopen){
            return
        }
        if(this.rightwing.isopen){
            this.wiggleleftwing(true,15,500)
            return
        }
        this.wigglerightwing(false,15,500)
    }

}