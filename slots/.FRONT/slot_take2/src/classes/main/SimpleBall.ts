import * as PIXI from 'pixi.js'
import Ball from './Ball';
import { MainData } from '@/assets/DataMain/Data';
import type Coordinates from './HelperClasses/Coordinates';


export default class SimpleBall extends Ball {
    constructor(id: number, startingx: number, startingy: number,Destination : number, Route : boolean[] , 
        PoleCords : Coordinates[] , FinishlineCord : Coordinates , BetAmount : number,speed : number) {
        super(id, startingx, startingy,Destination,Route, PoleCords , FinishlineCord , BetAmount,speed);
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xC0C0C0);
        graphics.drawCircle(MainData.Sizes.Ball / 2, MainData.Sizes.Ball / 2, MainData.Sizes.Ball / 2);
        graphics.endFill();
        this.container.addChild(graphics);
    }
}