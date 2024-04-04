
import { MainData } from "@/assets/DataMain/Data";
import PlinkoFinishLine from "./PinkoFinishLine";
import PlinkoPolesContainer from "./PlinkoPolesContainer";
import * as PIXI from 'pixi.js'
import type Ball from "./Ball";
import Coordinates from "./HelperClasses/Coordinates";
import BonusBall from "./BonusBall";
import SimpleBall from "./SimpleBall";
import Location from "./HelperClasses/Location";
export default class PlinkoMap{
    Finishline : PlinkoFinishLine
    PolesContainer : PlinkoPolesContainer
    container : PIXI.Container
    BallSpawnCords : Coordinates;
    DropedBalls : Ball[] = [];
    private onUpdateBalance: (winnings: number) => void;
    private GoToBonus : Function;
    speed:number;
    constructor(FinishLines : number[] , onUpdateBalance: (winnings: number) => void , GoToBonus : Function){
        this.GoToBonus = GoToBonus
        this.onUpdateBalance = onUpdateBalance;
        this.container = new PIXI.Container()
        const containerwidth = MainData.Sizes.Application.Width * 0.9
        const containerheight = MainData.Sizes.Application.Height * 0.9
        this.container.width = containerwidth
        this.container.height =containerheight
        this.container.x = MainData.Sizes.Application.Width * 0.05
        this.container.y = MainData.Sizes.Application.Height * 0.05
        const DistanceBetweenPoleCenters = containerwidth / FinishLines.length
        this.PolesContainer = new PlinkoPolesContainer(FinishLines.length - 1 , containerwidth , containerheight , DistanceBetweenPoleCenters)
        this.Finishline = new PlinkoFinishLine(FinishLines, containerwidth , containerheight , DistanceBetweenPoleCenters)
        this.container.addChild(this.PolesContainer.container)
        this.container.addChild(this.Finishline.container)
        this.BallSpawnCords = new Coordinates(containerwidth/2 -MainData.Sizes.Ball/2, -30)
        this.speed = 1
    }

    SpawnBall(IsBonus : boolean, Ballid : number,BallDestination : number , Route : boolean[] , BetAmount : number){
        let Ball : Ball;
        const finishcord : Coordinates = this.Finishline.FinishlineCords[BallDestination]
        const polecords = [this.PolesContainer.PoleCords[0][0]];
        const targetloc = new Location(0,0)
        Route.forEach((ele , index) => {
            targetloc.row += 1
            if(ele){
                targetloc.index += 1
            }
            if(index != Route.length - 1){
                polecords.push(this.PolesContainer.PoleCords[targetloc.row][targetloc.index])
            }
        })

        if(IsBonus){
            Ball = new BonusBall(Ballid,this.BallSpawnCords.x,this.BallSpawnCords.y,BallDestination, Route , polecords , finishcord , BetAmount,this.speed)
        }
        else{
            Ball = new SimpleBall(Ballid,this.BallSpawnCords.x,this.BallSpawnCords.y,BallDestination, Route, polecords , finishcord , BetAmount,this.speed)
        }
        this.DropedBalls.push(Ball)
        this.container.addChild(Ball.container)
    }

    update(Deltatime : number){
        this.DropedBalls = this.DropedBalls.filter(ball => {
            if (ball.update(Deltatime)) {
                this.container.removeChild(ball.container);
                if(ball instanceof BonusBall){
                    this.GoToBonus()
                }
                else{
                    this.onUpdateBalance(ball.BetAmount * this.Finishline.FinishLine[ball.FinishLineIndex])
                }
                return false;
            }
            return true;
        });
    }

    changeSpeed(speed : number){
        this.speed = speed
        this.DropedBalls.forEach((ball) => {
            ball.changeSpeed(speed)
        })
    }
}