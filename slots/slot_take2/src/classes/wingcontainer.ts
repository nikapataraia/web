import * as PIXI from 'pixi.js'
import { Wing } from './wing'
import * as Tween from '@tweenjs/tween.js';
export class WingContainer{
    leftwing : Wing;
    rightwing : Wing;
    wingcontainer : PIXI.Container;

    constructor(appWidth: number, appHeight: number) {
        this.wingcontainer = new PIXI.Container();
        this.leftwing = new Wing(appWidth, appHeight);
        this.rightwing = new Wing(appWidth, appHeight);
        this.wingcontainer.addChild(this.leftwing.wing);
        this.wingcontainer.addChild(this.rightwing.wing);
        this.wingcontainer.width = appWidth;
        this.wingcontainer.height = appHeight;

        this.leftwing.wing.width = appWidth * 0.12;
        this.leftwing.wing.x = appWidth * 0.13;
        this.rightwing.wing.width = appWidth * 0.12;
        this.rightwing.wing.x = appWidth * 0.75;
    }

    openleftwing(appWidth : number , duration : number){
        if(!this.leftwing.isopen){
            return this.leftwing.animateWing(0.03 * appWidth, duration)
        }
    }

    openrightwing(appWidth : number, duration : number){
        if(!this.rightwing.isopen){
            return this.rightwing.animateWing(appWidth * 0.85, duration)
        }
    }

    wiggleleftwing(wigglesLeft: boolean, distance: number, duration: number){
        return this.leftwing.wigglewing(wigglesLeft, distance, duration)
    }

    wigglerightwing(wigglesLeft: boolean, distance: number, duration: number){
        return this.rightwing.wigglewing(wigglesLeft, distance, duration)
    }

}