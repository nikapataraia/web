import * as PIXI from 'pixi.js'
import Ball from './Ball';
import { MainData } from '@/assets/DataMain/Data';
import type Coordinates from './HelperClasses/Coordinates';

export default class BonusBall extends Ball {
    constructor(id: number, startingx: number, startingy: number,Destination : number, Route : boolean[] , 
        PoleCords : Coordinates[] , FinishlineCord : Coordinates , BetAmount : number,speed : number) {
        super(id, startingx, startingy,Destination,Route , PoleCords , FinishlineCord , BetAmount,speed);
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFD700); // Gold color
        graphics.drawCircle(MainData.Sizes.Ball / 2, MainData.Sizes.Ball / 2, MainData.Sizes.Ball / 2);
        graphics.endFill();
        this.container.addChild(graphics);
    }
    setTimeAndGravity() {
        // Custom behavior for BonusBall
        switch (this.speed) {
            case 1:
                // Custom speed and gravity settings for BonusBall
                this.t = MainData.BallAnimation.Bonus.Speed1.t;
                this.gravity = MainData.BallAnimation.Bonus.Speed1.Gravity;
                break;
            case 2:
                this.t = MainData.BallAnimation.Bonus.Speed2.t;
                this.gravity = MainData.BallAnimation.Bonus.Speed2.Gravity;
                break;
            case 3:
                this.t = MainData.BallAnimation.Bonus.Speed3.t;
                this.gravity = MainData.BallAnimation.Bonus.Speed3.Gravity;
                break;
            default:
                // Fallback to normal speed and gravity or other custom behavior
                super.setTimeAndGravity(); // Calling the superclass method if needed
                break;
        }
    }
}