import * as PIXI from 'pixi.js'
import Location from './HelperClasses/Location';
import { MainData } from '@/assets/DataMain/Data';
import Coordinates from './HelperClasses/Coordinates';

export default class Ball{
    container : PIXI.Container
    Id : number
    Destinations : Coordinates[]
    FinishlineCord : Coordinates
    cords : Coordinates
    v_x : number;
    v_y : number;
    FinishLineIndex : number;
    targetPole : number
    Route : boolean[]
    BetAmount : number;
    t : number;
    gravity : number
    speed : number
    constructor(id : number , startingx : number, startingy : number,FinishLineIndex : number , 
        Route : boolean[] , Destinations : Coordinates[] , 
        FinishlineCord : Coordinates, BetAmount : number,speed : number){
        this.Id = id;
        this.targetPole = 0
        this.Destinations = Destinations
        this.FinishlineCord = FinishlineCord
        this.Destinations.push(FinishlineCord)
        this.cords = new Coordinates(startingx , startingy)
        this.container = new PIXI.Container()
        this.container.x = startingx
        this.container.y = startingy
        this.container.width , this.container.height = MainData.Sizes.Ball
        this.v_x = 0
        this.v_y = 0
        this.FinishLineIndex = FinishLineIndex
        this.Route = Route
        this.BetAmount = BetAmount;
        this.speed = speed
        this.t = 0
        this.gravity = 0
        this.setTimeAndGravity()
    }

    update(Deltatime : number) : boolean{
        if(this.cords.y >= this.Destinations[this.Destinations.length - 1].y && this.targetPole === this.Destinations.length - 1){
            return true
        }
        if(this.cords.y >= this.Destinations[this.targetPole].y){
            this.targetPole+=1
            this.setTimeAndGravity()
            this.v_x = (this.Destinations[this.targetPole].x - this.cords.x) / this.t
            this.v_y = (this.Destinations[this.targetPole].y - this.cords.y) / this.t - (this.gravity * this.t)/2
        }
        this.cords.x += this.v_x * Deltatime;
        this.v_y += this.gravity * Deltatime
        this.cords.y += this.v_y * Deltatime + 0.5 * this.gravity * Math.pow(Deltatime, 2);
        this.container.x = this.cords.x;
        this.container.y = this.cords.y;
        return false
    }

    changeSpeed(speed : number){
        this.speed = speed
    }

    setTimeAndGravity(){
        switch (this.speed){
            case 1:
                this.t = MainData.BallAnimation.Speed1.t;
                this.gravity = MainData.BallAnimation.Speed1.Gravity;
                break
            case 2:
                this.t = MainData.BallAnimation.Speed2.t;
                this.gravity = MainData.BallAnimation.Speed2.Gravity;
                break
            case 3:
                this.t = MainData.BallAnimation.Speed3.t
                this.gravity = MainData.BallAnimation.Speed3.Gravity
                break
            default:
                this.t = MainData.BallAnimation.Speed1.t;
                this.gravity = MainData.BallAnimation.Speed1.Gravity; 
                break
        }
    }
}